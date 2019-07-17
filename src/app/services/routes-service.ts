import { environment } from 'src/environments/environment';
import { HttpProxy } from './http-proxy';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
    })

export class RoutesService {

   private baseUrl :string = environment.url;

   constructor(private htttp:HttpProxy){}

   getRoutes():Observable<Trip[]>{
       
    return this.htttp.get(this.baseUrl+"route/all");
   }

   getRoute(id:string):Observable<Trip>{
       return this.htttp.get(this.baseUrl+"route/"+id);
   }

   getRoutesByUser():Observable<Trip[]>{
        return this.htttp.get(this.baseUrl+"route/all/mytrips");
   }

   createRoute(trip: Trip):Observable<boolean>{
       return this.htttp.post(this.baseUrl+"route/new", trip);
   }

   deleteRoute(id: string): Observable<boolean>{
      return this.htttp.delete(this.baseUrl+"route/"+id);
   }
}
