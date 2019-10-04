import { Component, OnInit } from '@angular/core';
import { Trip } from '../_models/trip';
import { RoutesService } from '../_services/routes-service';
import { DataFormatter } from '../_helpers/data-formatter';
import { TripView } from '../_models/trip-view';

@Component({
  selector: 'app-subscribed-trips',
  templateUrl: './subscribed-trips.component.html',
  styleUrls: ['./subscribed-trips.component.css']
})
export class SubscribedTripsComponent implements OnInit {

  subscribedTrips: TripView[] = [];

  constructor(private routeService:RoutesService, private dateFormat: DataFormatter) { }

  ngOnInit() {
    this.routeService.getUserSubscriptions().subscribe(trips => {
    this.subscribedTrips = trips;
    this.dateFormat.formatStartTime(this.subscribedTrips);
    })
  }

}
