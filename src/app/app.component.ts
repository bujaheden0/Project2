import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  userDetails : Object;
  constructor(private auth : AuthenticationService, private router : Router){
  }
  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('user'));
    console.log(this.userDetails);

    if(this.auth.loggedIn()){
      this.router.navigate(['profile'])
    }
    console.log("THIS IS APP.COMPONENT");
  }
}
