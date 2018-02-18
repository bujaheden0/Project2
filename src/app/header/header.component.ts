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
  constructor(public auth : AuthenticationService) { }

  ngOnInit() {
    this.getCurrentUser();
    console.log("I am a header");
  }

  getCurrentUser(){
    if(this.auth.loggedIn){
      this.currentUser = JSON.parse(localStorage.getItem('user'));
      //console.log(this.currentUser);
    }
  }
}
