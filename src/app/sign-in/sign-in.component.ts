import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { VerifyOtpService } from '../services/verify-otp.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  animations: [
    trigger('slideUp',[
      transition('* => *',[
        query('#slideUp' ,style({ opacity: 0, transform: 'translateY(+20px)'})),

        query('#slideUp' ,stagger('100ms',[
          animate('100ms', style({ opacity: 1, transform: 'translateY(0)'}))
        ]))
      ])
    ]),
    trigger(
      'slideSuceeded', [
        transition(':enter', [
          style({transform: 'translateY(-20px)', opacity: 0}),
          animate('300ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateY(-20px)', opacity: 0}))
        ])
      ]
    )
  ]
})
export class SignInComponent implements OnInit {
  username : String;
  password : String;
  responseMessage = Object;
  constructor(private authenticationService : AuthenticationService,
              private router: Router,
              private verify : VerifyOtpService) { }

  ngOnInit() {
    console.log("Something");
  }

  onLoginSubmit(){
    const user = {
      username : this.username,
      password : this.password
    }

    this.authenticationService.login(user).subscribe(res => {
        this.responseMessage = res
        console.log(this.responseMessage);
      if(res.success){
        this.authenticationService.storeUserData(res.token, res.user)
        if(this.authenticationService.loggedIn()){
          this.authenticationService.getCurrentUser();
          if(res.profile_status){
          this.router.navigate(['/main']);
          }else {
            this.router.navigate(['/profile'])
          }
        }
      } else if(res.userFound  && !res.verify){
        this.verify.getOtp().subscribe(res => {
          if(res.success){
          this.router.navigate(['/verify']);
          }
        })
      }
    })
  }
}
