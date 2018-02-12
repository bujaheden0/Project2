import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  UserDetails : Object;
  constructor(private auth : AuthenticationService){}
  ngOnInit() {
    this.auth.getProfile().subscribe(user => {
      this.UserDetails = user;
      console.log(this.UserDetails);
    })
  }
}
