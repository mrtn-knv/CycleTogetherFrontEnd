import { Injectable } from '@angular/core';
import { HttpProxy } from './http-proxy';
import { environment } from 'src/environments/environment';
import { Picture } from '../models/picture';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
    })
export class Gallery {

        baseUrl: string = environment.url;

        constructor(private http: HttpProxy){ }

        public Upload(image:Picture, routeId:string):Observable<Picture>{

           return this.http.post(this.baseUrl+"image/"+routeId, image);
        }
        
        getPicture(picId:string, routeId:string): Observable<Picture>{
            return this.http.get(this.baseUrl+"image/all/"+routeId+"/"+picId);
        }

        getAll(routeId:string):Observable<Picture[]>{
            return this.http.get(this.baseUrl+"image/all/"+routeId);
        }

        // deletePic(picId:string):void{
        //     this.http.post(this.baseUrl+"image/delete")
        // }
}
