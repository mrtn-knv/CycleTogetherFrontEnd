import { Component, OnInit } from '@angular/core';
import { Login } from '../_models/login';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Authorization } from '../_services/authorization';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel: Login = new Login();
  loginForm: FormGroup;
  error:string;
  success:boolean=true;
  isAuthorized:BehaviorSubject<boolean>;

  constructor(formBuilder: FormBuilder, private authorizator: Authorization, private router: Router) { 

    this.loginForm = formBuilder.group({
      '_email':['', Validators.required],
      '_password':['', Validators.required]
    });
  }

  ngOnInit() {

  }


  login(){
    this.authorizator.login(this.loginModel).subscribe((ok) => {
      if(ok){
        this.router.navigate(['all']);                 
      }   
    }, (error) =>{
      this.error = error;
      this.success=false;
    });
  }
}
