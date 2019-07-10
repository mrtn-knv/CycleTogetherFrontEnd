import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Authorization } from '../services/authorization';
import { Router } from '@angular/router';

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
  isAuthorized:boolean= false;

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
        this.isAuthorized = true;
        this.router.navigate(['route/all']);        
      }   
    }, (error) =>{
      this.error = error;
      this.success=false;
    });
  }
}
