import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
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
    ])
  ]
})
export class SignInComponent implements OnInit {
  username : String;
  password : String;
  constructor(private authenticationService : AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    console.log("Something");
  }

  onLoginSubmit(){
    const user = {
      username : this.username,
      password : this.password
    }

    this.authenticationService.login(user).subscribe(res => {
      if(res.success){
        this.authenticationService.storeUserData(res.token, res.user)
        if(this.authenticationService.loggedIn){
          this.router.navigate(['/profile']);
        }
      }
    })
  }
}
