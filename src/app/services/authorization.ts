import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Login } from '../models/login';

@Injectable({
providedIn: 'root'
})

export class HttpProxy{

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

     private defaultHeaders(): HttpHeaders {
         let headers = new HttpHeaders();
         headers = headers.set('Content-Type', 'application/json');
         const token = this.getToken();         
         if(token){            
           headers = headers.set('Authorization', 'Bearer ' + token);                                   
         }
         return headers;
     }
}

@Injectable({
providedIn: 'root'
})
export class Authorization {
    public isAuthorized: BehaviorSubject<boolean>;
    baseUrl: string = environment.url;

    constructor(private http: HttpProxy){
        this.isAuthorized = new BehaviorSubject<boolean>(this.http.getToken() != null);
    }

   public register(model: User): Observable<boolean>{
       return this.http.post(this.baseUrl + 'authorization/register', model);
   }

   public login(model: Login):Observable<boolean>{
       return new Observable<boolean>(subs =>{
           this.http.post(this.baseUrl + 'authorization/login', model).subscribe(response =>{
               this.http.setToken(response['token']);
               this.isAuthorized.next(true);
               subs.next(true);
               subs.complete();
           }), (error) =>{
               subs.error(error);
               subs.complete();
           }
       });
   }

   public logout(){
       return new Observable<boolean>(subs => {
        this.http.setToken(null);
        this.isAuthorized.next(false);
        subs.next(true);
        subs.complete();  
       })
   }
}
