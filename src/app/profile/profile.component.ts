import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { group, trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('signupTrigger', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(+20px)' }),
        animate(100)
      ]),
      transition(':leave', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate(500)
      ])
    ]),

    trigger('slideSuceeded', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate(300)
      ])
    ])


  ]
})

export class ProfileComponent implements OnInit {
  form: FormGroup;
  errorMessage = Boolean;
  isValid = false;
  description = String;
  constructor(private fb: FormBuilder, private auth: AuthenticationService, private router: Router) {

  }


  ngOnInit() {
    this.createFormValidate();
  }

  isFieldNotValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched
  }

  ValidatorDisplayCss(field: string) {
    return {
      'has-danger': this.isFieldNotValid(field)
    };
  }

  validatorInputCss(field: string) {
    return {
      'form-control-danger': this.isFieldNotValid(field)
    }
  }
  descriptions(req1,req2,req3,req4,req5){
    if(req1==true){
      req1 = "สูบบุหรี่";
    }
    if(req2==true){
      req2 = "สูบบุหรี่2";
    }
    if(req3==true){
      req3 = "สูบบุหรี่3";
    }
    if(req4==true){
      req4 = "สูบบุหรี่4";
    }
    if(req5==true){
      req5 = "สูบบุหรี่5";
    }
    return req1+"\n"+req2+"\n"+req3+"\n"+req4+"\n"+req5;
  }

  createFormValidate() {
    this.form = this.fb.group({
      // image: [null,
      //   [
      //     Validators.required,
      //     Validators.pattern(/^[A-Za-zก-๗]{2,15}$/)
      //   ]
      // ],
      religion: [null,
        [
          Validators.required,

        ]
      ],
      gender: [null,
        [
          Validators.required,
          //Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ]
      ],
      birthday: [null,
        [
          Validators.required,
          //Validators.minLength(8),
          //Validators.pattern(/^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/)
        ]
      ],
      facebook: [null,
        //this.auth.userDetails.firstname+this.auth.userDetails.lastname
        [
          Validators.required,

        ]
      ],
      tel: [null,
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10,10}$/)]],
      occupation: [null,
        [
          Validators.required,
        ]],
      sleep_time: [null,
        [
          Validators.required,
          // Validators.minLength(8),
          //Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
        ]],
      hobbies: [null,
        [
          Validators.required,
        ]],
      address: [null,
        [
          Validators.required,
          Validators.pattern(/^(?=.*[0-9])(?=.*[ต])(?=.*[อ])(?=.*[จ])(?=.*[.])[a-zA-Zก-๗0-9!@#$%^&*. ]{6,160}$/)
        ]],
      descriptions: [null,
        [
          
          
          //Validators.required,
        ]],
      descriptions1: [null,
        [
          //Validators.required,
        ]],
      descriptions2: [null,
        [
          //Validators.required,
        ]],
      descriptions3: [null,
        [
          //Validators.required,
        ]],
      descriptions4: [null,
        [
          //Validators.required,
        ]],
      descriptions5: [null,
        [
          //Validators.required,
        ]],
      minPrice: [0,
        [
          Validators.required,
          //Validators.minLength(8),
          //Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
        ]],
      maxPrice: [10000,
        [
          Validators.required,
          //Validators.minLength(8),
          //Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
        ]],
      r_status: [false,
        [
          Validators.required,
          //Validators.minLength(8),
          //Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
        ]],
      g_status: [false,
        [
          Validators.required,
          //Validators.minLength(8),
          //Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
        ]],
      b_status: [true,
        [
          //Validators.required,
          //Validators.minLength(8),
          //Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
        ]],

      b_range: [0,
        [
          Validators.required,
          //Validators.minLength(8),
          //Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
        ]],

    });
  }

  onSubmit() {
    
    console.log()
    //this.form.controls.descriptions.value+this.form.controls.descriptions1.value+this.form.controls.descriptions2.value+this.form.controls.descriptions3.value+this.form.controls.descriptions4.value+this.form.controls.descriptions5.value
    console.log(this.form)
    if (this.form.valid) {
      const user = {
        //image: this.form.controls.image.value,
        userDetails: this.auth.userDetails,
        religion: this.form.controls.religion.value,
        gender: this.form.controls.gender.value,
        birthday: this.form.controls.birthday.value,
        facebook: this.form.controls.facebook.value,
        tel: this.form.controls.tel.value,
        occupation: this.form.controls.occupation.value,
        sleep_time: this.form.controls.sleep_time.value,
        hobbies: this.form.controls.hobbies.value,
        address: this.form.controls.address.value,
        descriptions: this.form.controls.descriptions.value+"\n"+this.descriptions(this.form.controls.descriptions1.value,this.form.controls.descriptions2.value,this.form.controls.descriptions3.value,this.form.controls.descriptions4.value,this.form.controls.descriptions5.value),
        minPrice: this.form.controls.minPrice.value,
        maxPrice: this.form.controls.maxPrice.value,
        r_status: this.form.controls.r_status.value,
        g_status: this.form.controls.g_status.value,
        b_status: this.form.controls.b_status.value,
        b_range: this.form.controls.b_range.value,
      }
      console.log(user);

      this.auth.profile(user).subscribe(res => {
        console.log(res);
      })


    } else {
      this.validateAllFormFields(this.form);
      console.log(this.form.controls.price.value);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
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
