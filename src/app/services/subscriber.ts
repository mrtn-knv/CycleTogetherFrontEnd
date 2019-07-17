import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpProxy } from './http-proxy';
import { Trip } from '../models/trip';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
    })

export class Subscriber {

    baseUrl:string = environment.url;

    constructor(private http:HttpProxy){ }
       
    public subscribeForTrip(trip:Trip):Observable<boolean>{
     return this.http.post(this.baseUrl+"route/subscribe", trip);
    }
    public unsubscribeFromTrip(trip:Trip):Observable<boolean>{
       return this.http.post(this.baseUrl+"route/unsubscribe", trip);
       
    }
}
