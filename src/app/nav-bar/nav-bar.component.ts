import { Component, OnInit } from '@angular/core';
import { Authorization } from '../services/authorization';
import { Router } from '@angular/router';
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

  constructor(private authorizator: Authorization, private router: Router, private formBuilder:FormBuilder) {  
     
    this.searchForm = this.formBuilder.group({
      '_input':['']
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
