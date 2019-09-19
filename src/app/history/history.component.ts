import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../services/routes-service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  trips: Trip[];
  constructor(private routeService: RoutesService) { }

  ngOnInit() {
    this.routeService.getUserHistory().subscribe(trips=>this.trips=trips);
  }

}
