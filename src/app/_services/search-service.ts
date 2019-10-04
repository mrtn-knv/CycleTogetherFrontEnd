import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpProxy } from './http-proxy';
import { Observable } from 'rxjs';
import { TripView } from '../_models/trip-view';

@Injectable({
    providedIn: 'root'
    })


export class SearchService {

    private baseUrl :string = environment.url;

    constructor(private http:HttpProxy){}

    Search(searchInput: string): Observable<TripView[]>{
        
        return this.http.get(this.baseUrl+"search/"+searchInput);
    }
}
