import { Component, OnInit } from '@angular/core';
import { Authorization } from '../services/authorization';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  title: string = "CYCLE TOGETHER";
  isAuthorized: boolean;
  constructor(private authorizator: Authorization, private router: Router) { }

  ngOnInit() {
    this.authorizator.isAuthorized.subscribe(isAuth => {
      this.isAuthorized = isAuth;
      console.log(this.isAuthorized);
    });
  }
  logOut(){
    this.authorizator.logout().subscribe(() =>{
      this.router.navigate(['login']);
      this.isAuthorized = false;  
    })
  }

}
