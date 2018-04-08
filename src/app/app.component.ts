import { Component, OnInit, NgZone, Input} from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { MatchingService } from './services/matching.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  messages;
  constructor(private auth : AuthenticationService,
              private route : Router,
              private matching : MatchingService){}
  ngOnInit() {
    // if(this.auth.loggedIn && this.auth.userDetails){
    //   this.route.navigate(['/main']);
    // }
  }

  
}
