import { Component, OnInit } from '@angular/core';
import { Authorization } from '../services/authorization';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  title: string = "CYCLE TOGETHER";
  public authorized = false;
  constructor(private authorizator: Authorization, private router: Router) { }

  ngOnInit() {
    this.authorizator.isAuthorized.subscribe(isAuthorized => {
      this.authorized = isAuthorized;
    })
  }
  logOut(){
    this.authorizator.logout().subscribe(() =>{
      this.router.navigate(['authorization/login']);
    })
  }

}
