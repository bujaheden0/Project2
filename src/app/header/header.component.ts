import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser : Object;
  constructor(public auth : AuthenticationService,
              private router : Router) { }

  ngOnInit() {
    if(this.auth.loggedIn()){
      console.log(this.auth.userDetails);
    }
  }

  onLogOut(){
    this.auth.logOut();
    if(!this.auth.loggedIn()){
      this.router.navigate[('/')]
    }
  }
}
