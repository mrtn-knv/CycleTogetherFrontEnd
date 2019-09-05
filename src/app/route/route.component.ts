import { Component, OnInit } from '@angular/core';
import { Trip } from '../models/trip';
import { RoutesService } from '../services/routes-service';
import { Router } from '@angular/router';
import { Picture } from '../models/picture';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  routesModel: Trip[] = [];
   

  constructor(private routeService: RoutesService) { }

  ngOnInit() {
    this.routeService.getRoutes().subscribe(routesRes => {
      this.routesModel = routesRes;
        this.formatStartTime();      
  }), (err) => console.log(err);

  }

  private formatStartTime() {
    for (let route of this.routesModel) {
      var pipe = new DatePipe('en-US');
      route.dateFormatted = pipe.transform(route.startTime, 'fullDate');
      route.startHour = pipe.transform(route.startTime, 'shortTime');
    }
    ;
  }
}
