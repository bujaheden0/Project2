import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { MatchingService } from '../services/matching.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  messages;
  oldMessages;
  count_message = 0;
  constructor(public auth : AuthenticationService,
              private router : Router,
              private matching : MatchingService) { }

  ngOnInit(){
    setInterval(() => {
      setTimeout(() => { this.getMessages()}, 2000);
    },1000)

      
  }


  getMessages(){
    if(this.auth.loggedIn){
      this.messages = this.matching.fetch();
    }
  }

  onClick(senderId , messageId, type){
    if(type == 1){
      this.router.navigate(['/user/' + senderId +'/' + messageId]);
    } else if(type == 2){
      this.router.navigate(['/userMatched/' + senderId +'/' + messageId]);
    }
  }
  onLogOut(){
    this.auth.logOut();
    if(!this.auth.loggedIn()){
      this.router.navigate[('/')]
    }
  }
}
