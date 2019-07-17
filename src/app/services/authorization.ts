import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Login } from '../models/login';
import { HttpProxy } from './http-proxy';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
providedIn: 'root'
})
export class Authorization {
    public isAuthorized: BehaviorSubject<boolean>;
    baseUrl: string = environment.url;

    constructor(private http: HttpProxy, public jwtHelper: JwtHelperService){
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

   public isAuthenticated(): boolean{
       const token = localStorage.getItem('token');
       return !this.jwtHelper.isTokenExpired(token);
       
   }
}
