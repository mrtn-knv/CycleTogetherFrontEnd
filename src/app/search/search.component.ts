import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from '../services/search-service';
import { TripSearchView } from '../models/trip-search-view';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  hasMatch:boolean;
  input: string;
  foundTrips: TripSearchView[] = [];

  constructor(public searchEngine: SearchService, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(params => {
      this.input = params.get('input');                
    });

    this.searchEngine.Search(this.input).subscribe(trips => {
      this.foundTrips = trips;
    });
  }      
}
