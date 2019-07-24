import { Component, OnInit } from '@angular/core';
import { Trip } from '../models/trip';
import { RoutesService } from '../services/routes-service';

@Component({
  selector: 'app-subscribed-trips',
  templateUrl: './subscribed-trips.component.html',
  styleUrls: ['./subscribed-trips.component.css']
})
export class SubscribedTripsComponent implements OnInit {

  subscribedTrips: Trip[] = [];

  constructor(private routeService:RoutesService) { }

  ngOnInit() {
    this.routeService.getUserSubscriptions().subscribe(trips => {
    this.subscribedTrips = trips;
    })
  }

}
