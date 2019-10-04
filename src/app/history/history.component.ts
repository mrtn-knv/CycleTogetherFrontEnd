import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../_services/routes-service';
import { Trip } from '../_models/trip';
import { DataFormatter } from '../_helpers/data-formatter';
import { TripView } from '../_models/trip-view';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  trips: TripView[] = [];

  constructor(private routeService: RoutesService, private dateFormat: DataFormatter) { }

  ngOnInit() {
    this.routeService.getUserHistory().subscribe(trips=> {
      this.trips = trips;
      this.dateFormat.formatStartTime(this.trips);
    }, (err) => {
      console.log(err);
    });  
  }

}
