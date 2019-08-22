import { Component, OnInit } from '@angular/core';
import { Authorization } from '../services/authorization';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthGuard } from '../services/auth-guard';
import { SearchComponent } from '../search/search.component';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  title: string = "CYCLE TOGETHER";
  isAuthorized: boolean;
  searchInput: string;
  searchForm: FormGroup;
  constructor(private authorizator: Authorization, private router: Router, private builder: FormBuilder) {
      this.searchForm = this.builder.group({
          '_searchInput': ['']
      });

   }

  ngOnInit() {  
    this.authorizator.isAuthorized.subscribe(isAuth => this.isAuthorized = isAuth );
  }
  logOut(){
    this.authorizator.logout().subscribe(() => {
      this.router.navigate(['login']);
    });   
  }

  seachInTrips(){
    this.router.navigate(['search/', this.searchInput]);
  }

}
