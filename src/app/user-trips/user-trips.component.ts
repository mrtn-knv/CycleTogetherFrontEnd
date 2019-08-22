import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../services/routes-service';
import { Trip } from '../models/trip';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-trips',
  templateUrl: './user-trips.component.html',
  styleUrls: ['./user-trips.component.css']
})
export class UserTripsComponent implements OnInit {

  userTrips: Trip[] = [];
  hasTrips: boolean = true;
  id:string;

  constructor(private routeService: RoutesService,private activateRoute: ActivatedRoute, private router:Router) { }

  ngOnInit() {
      this.routeService.getRoutesByUser().subscribe(routes =>{
        this.userTrips = routes;
        if(this.userTrips.length > 0){
          this.hasTrips = true;
        }
        else{
          this.hasTrips = false;
        }
    });

  }
}
