import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from '../_services/search-service';
import { ActivatedRoute } from '@angular/router';
import { DataFormatter } from '../_helpers/data-formatter';
import { TripView } from '../_models/trip-view';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {  
  
  hasMatch:boolean;
  input: string;
  foundTrips: TripView[] = [];

  constructor(private searchEngine: SearchService, 
              private activateRoute: ActivatedRoute, 
              private dateFormatter: DataFormatter) { }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(params => {
      this.input = params.get('input');                
      });
      
      this.searchEngine.Search(this.input).subscribe(result => {
        this.foundTrips = result;
        this.dateFormatter.formatStartTime(this.foundTrips);
        console.log(this.foundTrips);
      }, err => {
        console.log(err);
      });
  }
}
