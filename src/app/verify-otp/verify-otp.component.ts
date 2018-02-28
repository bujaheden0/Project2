import { Component, OnInit } from '@angular/core';
import { VerifyOtpService} from '../services/verify-otp.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { group,trigger,style,transition,animate,keyframes,query,stagger,state } from '@angular/animations';
@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css'],
  animations: [
    trigger('verifyTrigger', [
      transition(':enter',[
        style({ opacity:0 , transform: 'translateY(+20px)'}),
        animate(100)
      ]),
    ]),

    trigger(
      'slideAlert', [
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
export class VerifyOtpComponent implements OnInit {
  number : string;
  verifynumber : string;
  verifynum1 : any;
  verifynum2 : any;
  verifynum3 : any;
  verifynum4 : any;
  errorMessage = Object;
  constructor(private verify : VerifyOtpService,
              private auth   : AuthenticationService,
              private route  : Router) { }

  ngOnInit() {

  }

  onVerifySubmit(){
    if((this.verifynum1 || this.verifynum1 == 0) && (this.verifynum2 || this.verifynum2 == 0)
      && (this.verifynum3 || this.verifynum3 == 0) && (this.verifynum4 || this.verifynum4 == 0)){
        this.verifynumber = this.verifynum1.toString() +  this.verifynum2.toString() +
                            this.verifynum3.toString() +this.verifynum4.toString()
    } else {
      this.verifynumber = "";
    }
    const data = {
      userOtp : this.verifynumber
    }
    this.verify.sendOtp(data).subscribe(res => {
      this.errorMessage = res;
      if(res.success){
        console.log(res.data)
        const userData = {
          username : res.data.username,
          password : res.data.password
        }
        console.log(userData);
        this.auth.login(userData).subscribe(res => {
          if(res.success){
            this.auth.storeUserData(res.token, res.user)
            if(this.auth.loggedIn()){
              this.auth.getCurrentUser();
              if(res.profile_status){
                this.route.navigate(['/']);
              }else{
                this.route.navigate(['/profile'])
              }
            }
          }
        })
      }
    })
  }

  onGetOtp(){
    this.verify.getOtp().subscribe(res => {
        this.errorMessage = res
    })
  }

}
