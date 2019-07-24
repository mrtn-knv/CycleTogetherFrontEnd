import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
    })
    
export class HttpProxy {
    constructor(private http: HttpClient) { }

    public setToken(token:string): void{
        if(token == null){
            localStorage.removeItem('token');
        }
        else{
            localStorage.setItem('token', token);
        }       
    }

    public getToken():string{           
        return localStorage.getItem('token');
    }

    public get<T>(url:string): Observable<T>{
        const headers = this.defaultHeaders();                             
        return this.http.get<T>(url, { headers });
        
    }
     public post<T>(url: string, data:any): Observable<T>{
        const headers = this.defaultHeaders();
        return new Observable<T>(subs => {
            this.http.post<T>(url, data, { headers }).subscribe(response => {
              if (!environment.production) {
                console.log(url, JSON.stringify(response));
              }
              subs.next(response);
              subs.complete();
            }, (error) => {
              subs.error(error);
              subs.complete();
            });
          });

     }

     public delete<T>(url: string): Observable<T>{
      const headers = this.defaultHeaders();
      return new Observable<T>(subs => {
          this.http.delete<T>(url, { headers }).subscribe(response => {
            if (!environment.production) {
              console.log(url, JSON.stringify(response));
            }
            subs.next(response);
            subs.complete();
          }, (error) => {
            subs.error(error);
            subs.complete();
          });
        });

   }

     private defaultHeaders(): HttpHeaders {
         let headers = new HttpHeaders();
         headers = headers.set('Content-Type', 'application/json');
         headers = headers.set('Access-Control-Allow-Origin', '*');                             
         const token = this.getToken();         
         if(token){            
           headers = headers.set('Authorization', 'Bearer ' + token);
         }
         return headers;
     }
}
