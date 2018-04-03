import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { MatchingService } from '../services/matching.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  messages : Object;
  constructor(public auth : AuthenticationService,
              private router : Router,
              private matching : MatchingService) { }


  ngOnInit(){}


  getMessages(){
    if(this.auth.loggedIn){
      this.messages = this.matching.fetch();
      console.log(this.messages);
    }
  }
  onLogOut(){
    this.auth.logOut();
    if(!this.auth.loggedIn()){
      this.router.navigate[('/')]
    }
  }
}
