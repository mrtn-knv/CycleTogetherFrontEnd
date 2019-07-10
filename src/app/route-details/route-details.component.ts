import { Component, OnInit } from '@angular/core';
import { Trip } from '../models/trip';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesService } from '../services/routes-service';
import { Subscriber } from '../services/subscriber';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css']
})
export class RouteDetailsComponent implements OnInit {

  trip:Trip = new Trip();
  id: string;
  subscribed: number;
  isSubscribed:boolean;
  currentUserId:string;

  constructor(private activateRoute: ActivatedRoute, private router:Router, private  routeService: RoutesService, private subscriber:Subscriber) {
   
  }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(params => {
      this.id = params.get('id');     
      this.routeService.getRoute(this.id).subscribe(routeRes => {
        this.trip = routeRes;
        this.subscribed = this.trip.subscribed.length;       
      })
    })
     let token =  localStorage.getItem('token');
     var decoded = jwt_decode(token);
     this.currentUserId = decoded.nameid;

     if(this.trip.subscribed.indexOf(this.currentUserId) != -1){
       this.isSubscribed = true;
     }
      
  }
  goToGallery(id:string){
    this.id = id;
    this.router.navigate(['image/all/'+this.id]);
}
 
subscribe(trip:Trip){
  this.subscriber.subscribeForTrip(trip).subscribe((res) =>{
    if(!res){
      alert("You cant subscribe for this trip.");
    }
    else{
      this.isSubscribed = res;
      this.subscribed++;
    }

  }, err => {
    console.log(err);
  })
}


unsubscribeFromRoute(trip:Trip){
  this.subscriber.unsubscribeFromTrip(trip).subscribe(res => {
      if(!res){
        alert("There was a problem with unsubscription. Please, try again.")
      }
      else{
        this.subscribed--;
      }
  })
}
 
}
