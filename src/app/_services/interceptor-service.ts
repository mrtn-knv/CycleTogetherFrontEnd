import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Authorization } from './authorization';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor {
    constructor(private authentication: Authorization, private router:Router){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .pipe(catchError((error) => {
            if(error.status === 401){
                this.authentication.logout().subscribe(() => this.router.navigate(['login']));
                console.log(this.authentication.isAuthorized.value);  
            }
            return throwError(error);
        }));
    }
}
