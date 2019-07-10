import { Component, OnInit } from '@angular/core';
import { Trip } from '../models/trip';
import { RoutesService } from '../services/routes-service';
import { Router } from '@angular/router';
import { Picture } from '../models/picture';


@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  routesModel: Trip[] = []; 

  constructor(private routeService: RoutesService, private router: Router) { }

  ngOnInit() {
    this.routeService.getRoutes().subscribe(routesRes => {
      this.routesModel = routesRes;
      
  });

  }
}
