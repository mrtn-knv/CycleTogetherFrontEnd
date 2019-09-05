import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InvitationService } from '../services/invitation-service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {

  routeId: string;
  reveiversEmails: string[] = [];


  constructor(private router: Router, private activateRoute: ActivatedRoute, private invitationSender: InvitationService) { }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(params => {
        this.routeId = params.get('id');
    });
  }

  onSubmit(email:string){
    console.log(email);
    this.reveiversEmails = email.split(" ");
    console.log(this.reveiversEmails);
    debugger;
    this.invitationSender.invitePeople(this.reveiversEmails, this.routeId).subscribe(res => {
      if(res){
        this.router.navigate(["route/"+this.routeId]);
      }
      
    }), (err) => {
      console.log(err);
    };

  }

}
