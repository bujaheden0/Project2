import { Component, OnInit, NgZone, Input} from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private auth : AuthenticationService){

  }
  ngOnInit() {
    this.auth.getUserFacebook().subscribe(res => {
      console.log(res);
    })
  }

  
}
