import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Authorization } from './authorization';

@Injectable()
export class AuthGuard implements CanActivate{
    
    constructor(public auth:Authorization, public router:Router){}

    canActivate(): boolean{
        if(!this.auth.isAuthenticated()){
            this.auth.logout().subscribe(() => 
            this.router.navigate(['login']));                       
            return false;
        }
        return true;
    }
}
