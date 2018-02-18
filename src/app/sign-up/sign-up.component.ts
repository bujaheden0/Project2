import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators,NgForm } from '@angular/forms';
import { group,trigger,style,transition,animate,keyframes,query,stagger,state } from '@angular/animations';
import { AuthenticationService} from '../services/authentication.service';

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

    trigger('slideSuceeded', [
      transition('void => *',[
      style({ opacity: 0, transform: 'translateY(-20px)'}),
      animate(300)
      ])
    ])
  
    
  ]
})
export class SignUpComponent implements OnInit {
  
  form: FormGroup;
  errorMessage = Object;
  isValid = false;
  UserDetails : Object;
  constructor(private fb: FormBuilder, private authenticationService : AuthenticationService) { 
      
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
                Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)]]
    })
  }

  onSubmit(){
    console.log(this.form)
      if(this.form.valid){
        const user = {
          firstname : this.form.controls.firstname.value,
          lastname  : this.form.controls.lastname.value,
          email     : this.form.controls.email.value,
          username  : this.form.controls.username.value,
          password  : this.form.controls.password.value,
        }
        this.authenticationService.register(user).subscribe(res => {
              this.errorMessage = res;
        })

      }else{
        this.validateAllFormFields(this.form);
      }
    }

    onLoginFacebook(){
      this.authenticationService.loginFacebook().subscribe(res => {
        console.log(res.json());
      })
      console.log("On login");
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


