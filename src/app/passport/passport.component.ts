import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.css']
})
export class PassportComponent implements OnInit {
  userObject;
  constructor(private auth : AuthenticationService,
              private route : ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
    this.getCallbackfromFacebook();
  }

  getCallbackfromFacebook(){
    this.route.params.subscribe(token => {
      if(token.id){
      const data = {
        userId : token.userId
      }
      this.auth.getFaceBookUser(data).subscribe(res => {
        if(res.success){
          this.auth.storeUserData(token.id,res.user);
        if(this.auth.loggedIn()){
          this.auth.getCurrentUser();
          this.auth.getProfile().subscribe(res => {
            this.userObject = res;
            if(this.userObject.profile_status){
              this.router.navigate(['/main']);
            } else {
              this.router.navigate(['/profile']);
            }
          })
          
          
              }
            }
          })
        } else {
          this.router.navigate(['/signup']);
        }
        })
      }

  



}
