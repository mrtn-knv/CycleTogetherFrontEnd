import { environment } from '../../environments/environment';
import { HttpProxy } from '../_services/http-proxy';
import { Observable } from 'rxjs';
import { Trip } from '../_models/trip';
import { Injectable } from '@angular/core';
import { TripView } from '../_models/trip-view';

@Injectable({
    providedIn: 'root'
})

export class RoutesService {

    private baseUrl: string = environment.url;

    constructor(private htttp: HttpProxy) { }

    getRoutes(): Observable<TripView[]> {

        return this.htttp.get(this.baseUrl + "route/all");
    }

    getRoute(id: string): Observable<Trip> {
        return this.htttp.get(this.baseUrl + "route/" + id);
    }

    getRoutesByUser(): Observable<TripView[]> {
        return this.htttp.get(this.baseUrl + "route/all/mytrips");
    }

    createRoute(trip: Trip): Observable<boolean> {
        return this.htttp.post(this.baseUrl + "route/new", trip);
    }

    getUserSubscriptions(): Observable<TripView[]> {
        return this.htttp.get(this.baseUrl + "subscribe/subscribed");
    }

    getUserHistory(): Observable<TripView[]> {
        return this.htttp.get(this.baseUrl + "subscribe/history");
    }

    deleteRoute(id: string): Observable<boolean> {
        return this.htttp.delete(this.baseUrl + "route/" + id);
    }

   edit(trip: Trip): Observable<Trip>{
        return this.htttp.post(this.baseUrl+"route/edit", trip);
   }
}
