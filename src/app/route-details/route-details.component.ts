import { OnInit } from '@angular/core';
import{ Component } from '@angular/core';
import { Trip } from '../_models/trip';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesService } from '../_services/routes-service';
import { Subscriber } from '../_services/subscriber';
import { SubscribedUsers } from '../_models/subscribed-users';
import { TokenGetter } from '../_helpers/token-getter';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css']
})
export class RouteDetailsComponent implements OnInit {

  trip:Trip = new Trip();
  id: string;
  subscribedLenght: number;
  subscribed:SubscribedUsers[];
  isSubscribed:boolean = false;
  routes: Trip[] = [];
  userId: string;
  isRouteOwner: boolean;
  errorMsg: string;

  constructor(private activateRoute: ActivatedRoute,
              private router:Router,
              private  routeService: RoutesService,
              private subscriber:Subscriber,
              private idGetter: TokenGetter) {
   
  }

  ngOnInit() {
    this.userId = this.idGetter.getUserId();
    this.activateRoute.paramMap.subscribe(params => {
      this.id = params.get('id');     
    })
    this.routeService.getRoute(this.id).subscribe(routeRes => {
      this.trip = routeRes;
      this.isRouteOwner = this.isOwner(routeRes.userId);   
      this.subscribedLenght = this.trip.subscribed.length;
      this.subscribed = routeRes.subscribed;
      this.isSubscribed = this.isUserSubscribed(this.subscribed);
      console.log(this.trip);              
    })
    
     
  }

  private isOwner(routeCreator: string) : boolean {
    if (this.userId !== routeCreator) {
      return  false;
    }
    else{
      return true;
    }
  }

  goToGallery(id:string){
    this.id = id;
    this.router.navigate(['image/all/'+this.id]);
  }

  isUserSubscribed(subscrubed:SubscribedUsers[]):boolean{
 
       this.userId = this.idGetter.getUserId();

       for (var val of subscrubed) {
        if(val.userId == this.userId){
          return true;
        }
      }
       return false;
  }

  delete(id:string){
      this.routeService.deleteRoute(id).subscribe(res =>{
        if(res){
          var current = this.routes.findIndex(trip => trip.id === id);
          this.routes.splice(current, 1);          
          this.router.navigate(['all']);
        }
      });
      
  }
 
  subscribe(subs:Trip){
  this.subscriber.subscribeForTrip(subs).subscribe((res) =>{
    if(!res){

      alert("You cant subscribe for this trip.");
    }
    else{
      this.isSubscribed = res;
      this.subscribedLenght++;
    }

    });
  }

  unsubscribeFromRoute(trip:Trip){
    this.subscriber.unsubscribeFromTrip(trip).subscribe(res => {
      if(!res){
        alert("There was a problem with unsubscription. Please, try again.");
      }
      else{
        this.subscribedLenght--;
        window.location.reload();
      }
    })
  }
 
}
