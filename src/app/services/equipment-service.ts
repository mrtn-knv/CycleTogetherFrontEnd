import { environment } from 'src/environments/environment';
import { HttpProxy } from './authorization';
import { Equipment } from '../models/equipment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
providedIn: 'root'
})

export class EquipmentService {

    private baseUrl: string=environment.url;

    constructor(private http: HttpProxy){ }

    public getEquipments():Observable<Equipment[]>{
        return this.http.get(this.baseUrl+"equipment/all");
    }
}
