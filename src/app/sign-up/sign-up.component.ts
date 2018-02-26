import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators,NgForm } from '@angular/forms';
import { group,trigger,style,transition,animate,keyframes,query,stagger,state } from '@angular/animations';
import { AuthenticationService} from '../services/authentication.service';
import { Router } from '@angular/router';
import { VerifyOtpService } from '../services/verify-otp.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  animations: [
    trigger('signupTrigger', [
      transition(':enter',[
        style({ opacity:0 , transform: 'translateY(+20px)'}),
        animate(100)
      ]),
      transition(':leave',[
        style({ opacity:0 , transform: 'translateY(-20px)'}),
        animate(500)
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
export class SignUpComponent implements OnInit {
  
  form: FormGroup;
  errorMessage = Object;
  isNotValid = false;
  UserDetails : Object;
  constructor(private fb: FormBuilder, 
              private authenticationService : AuthenticationService,
              private router : Router,
              private verify : VerifyOtpService) { 
      
  }

  ngOnInit() {
    this.createFormValidate();
  }


  isFieldNotValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched
  }

  ValidatorDisplayCss(field: string){
    return {
      'has-danger':  this.isFieldNotValid(field)
    };
  }

  validatorInputCss(field: string){
    return{
      'form-control-danger': this.isFieldNotValid(field)
    }
  }
  createFormValidate(){
    this.form = this.fb.group({
      firstname: [null, 
                [
                  Validators.required,
                  Validators.pattern(/^[A-Za-zก-๗]{2,15}$/)
                ]
              ],
      lastname: [null, 
                [
                  Validators.required, 
                  Validators.pattern(/^[A-Za-zก-๗]{2,15}$/)
                ]
              ],
      email:[null,
                [
                  Validators.required, 
                  Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                ]
              ],
      username:[null, 
                [
                  Validators.required, 
                  Validators.minLength(8),
                  Validators.pattern(/^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/)
                ]
              ],
      password:[null, 
              [
                Validators.required, 
                Validators.minLength(8),
                Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)]
              ],
          tel:[null,
              [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(10),
              Validators.pattern(/^[0-9]*$/)
              ]
              ]
    })
  }

  onFacebookSignup(){
    this.authenticationService.getPassportFacebookCallback().subscribe(res => {
      console.log(res);
    })
  }
  onSubmit(){
    console.log(this.form)
      if(this.form.valid){
        this.isNotValid = false;
        var telephone = this.form.controls.tel.value;
            telephone = telephone.slice(1,10);
            telephone = "66" + telephone;
        const user = {
          firstname : this.form.controls.firstname.value,
          lastname  : this.form.controls.lastname.value,
          email     : this.form.controls.email.value,
          username  : this.form.controls.username.value,
          password  : this.form.controls.password.value,
          tel       : telephone
        }
        this.authenticationService.register(user).subscribe(res => {
              this.errorMessage = res;
        if(res.success){
          this.verify.getOtp().subscribe(data => {
            if(data.success){
              this.router.navigate(['/verify'])
            }
          });
        }
        })

      }else{
        this.isNotValid = true;
        this.validateAllFormFields(this.form);
      }
    }


    validateAllFormFields(formGroup : FormGroup){
      Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        }
      })
    }
  }


