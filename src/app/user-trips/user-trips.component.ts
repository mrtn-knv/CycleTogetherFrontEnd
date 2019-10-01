import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../_services/routes-service';
import { Trip } from '../_models/trip';
import { DataFormatter } from '../_helpers/data-formatter';

@Component({
  selector: 'app-user-trips',
  templateUrl: './user-trips.component.html',
  styleUrls: ['./user-trips.component.css']
})
export class UserTripsComponent implements OnInit {

  userTrips: Trip[] = [];
  hasTrips: boolean = true;
  id:string;

  constructor(private routeService: RoutesService, private dateFormat: DataFormatter) { }

  ngOnInit() {
      this.routeService.getRoutesByUser().subscribe(routes =>{
        this.userTrips = routes;
        if(this.userTrips){
          this.hasTrips = true;
          this.dateFormat.formatStartTime(this.userTrips);

        }
        else{
          this.hasTrips = false;
        }
    }, (err) => {
      console.log(err);
    });

  }
}
