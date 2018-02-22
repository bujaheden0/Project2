import { Component, OnInit } from '@angular/core';
import { VerifyOtpService} from '../services/verify-otp.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit {
  verifynumber : string;
  verifynum1 : string;
  verifynum2 : string;
  verifynum3 : string;
  verifynum4 : string;

  constructor(private verify : VerifyOtpService,
              private auth   : AuthenticationService,
              private route  : Router) { }

  ngOnInit() {

  }

  onVerifySubmit(){
    this.verifynumber = this.verifynum1.toString() + this.verifynum2.toString() + this.verifynum3.toString() + this.verifynum4.toString()
    const data = {
      userOtp : this.verifynumber
    }
    this.verify.sendOtp(data).subscribe(res => {
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
              this.route.navigate(['/'])
            }
          }
        })
      }
    })
  }

}
