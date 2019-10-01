import { environment } from 'src/environments/environment';
import { HttpProxy } from './http-proxy';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
    })

export class InvitationService {

    private baseUrl :string = environment.url;
    
    constructor(private http: HttpProxy) { }
    
    
    invitePeople(emails:string[], routeId: string): Observable<boolean> {
       return this.http.post(this.baseUrl+"notification/"+routeId+'/invite', emails);
    }
}
