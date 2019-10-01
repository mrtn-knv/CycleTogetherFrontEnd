import { Component, OnInit } from '@angular/core';
import { Trip } from '../_models/trip';
import { RoutesService } from '../_services/routes-service';
import { DataFormatter } from '../_helpers/data-formatter';
import { TripView } from '../_models/trip-view';


@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  routesModel: TripView[] = [];
   

  constructor(private routeService: RoutesService,private dataFormat: DataFormatter) { }

  ngOnInit() {
    this.routeService.getRoutes().subscribe(routesRes => {
      this.routesModel = routesRes;
      console.log(this.routesModel);
        this.dataFormat.formatStartTime(this.routesModel);      
  }), (err) => console.log(err);

  }
}
