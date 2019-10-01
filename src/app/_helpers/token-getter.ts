import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class TokenGetter {
    decodedToken: any;
    
    constructor(){}
    public getUserId(): any {
        let token = localStorage.getItem('token');
        this.decodedToken = jwt_decode(token);        
        return this.decodedToken.nameid;
      }
}
