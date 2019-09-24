import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpProxy } from './http-proxy';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GeocodingService {
    constructor(private http: HttpClient) { }

    validateAddress(address:string): Observable<any>{
        return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBnM72vVFqGeINyI2eGu5zuQ9_wD2udgoI&components=country:bg`);
    }
}