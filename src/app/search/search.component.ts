import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from '../_services/search-service';
import { TripSearchView } from '../_models/trip-search-view';
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

  constructor(private searchEngine: SearchService, 
              private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(params => {
      this.input = params.get('input');                
      });
      
      this.searchEngine.Search(this.input).subscribe(result => {
        this.foundTrips = result;
        console.log(this.foundTrips);
      }, err => {
        console.log(err);
      });
  }
}
