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
  profile: any = {};
  filesToUpload;
  picture;
  constructor(private fb: FormBuilder, private auth: AuthenticationService, private router: Router) {
  }
  unknown(user){
    user = {
      userDetails: this.auth.userDetails,
    }
    this.auth.getSettingProfile(user).subscribe(res => {
      this.profile = res;
      var hours = Math.floor(this.profile.details.sleep_time/60).toString();
      var minutes = (this.profile.details.sleep_time%60).toString();
      console.log("This is a Hours : " + hours);
      console.log("This is a minutes : " + minutes);
      if(hours == "24"){ hours = "00";}
      if(minutes.length == 1){ minutes = "0" + minutes;}
      console.log("This is a Hours : " + hours);
      console.log("This is a minutes : " + minutes);
      this.profile.details.sleep_time = hours + ":" + minutes;
      console.log("This is a Profile Users");
      console.log(this.profile);
      console.log("------------------------");
    })
  }

  ngOnInit() {
    console.log("This is a User Profile : ");
    console.log(this.auth.userDetails);
    this.unknown(this.auth.userDetails);
    this.auth.getImage().subscribe(res => {
      this.picture = res;
    });
    //console.log(this.profile.details.descriptions)
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
  descriptions(req1, req2, req3, req4, req5) {
    if (req1 == true) {
      req1 = "สูบบุหรี่ได้";
    } else { req1 = ""; }
    if (req2 == true) {
      req2 = "ละเลยการทำความสะอาดได้";
    } else { req2 = ""; }
    if (req3 == true) {
      req3 = "เลี้ยงสัตว์ได้";
    } else { req3 = ""; }
    if (req4 == true) {
      req4 = "ส่งเสียงดังได้";
    } else { req4 = ""; }
    if (req5 == true) {
      req5 = "พาเพื่อนเข้าห้องได้";
    } else { req5 = ""; }
    return req1 + " " + req2 + " " + req3 + " " + req4 + " " + req5;
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
      facebook: ["",
      //this.auth.userDetails.firstname+this.auth.userDetails.lastname
      [   
        Validators.required,
      ]
      ],
      tel: ["",
        [
          Validators.required,
          Validators.pattern(/^[0-9]{11,11}$/)]],
      occupation: ["",
        [
          Validators.required,
        ]],
      sleep_time: [null,
        [
          Validators.required,
          // Validators.minLength(8),
          //Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
        ]],
      hobbies: ["",
        [
          Validators.required,
        ]],
      address: ["",
        [
          Validators.required,
          //Validators.pattern(/^(?=.*[0-9])(?=.*[ต])(?=.*[อ])(?=.*[จ])(?=.*[.])[a-zA-Zก-๗0-9!@#$%^&*. ]{6,160}$/)
        ]],
      descriptions: ["",
        [
          //Validators.required,
        ]],
      descriptions1: [false,
        [
          //Validators.required,
        ]],
      descriptions2: [false,
        [
          //Validators.required,
        ]],
      descriptions3: [false,
        [
          //Validators.required,
        ]],
      descriptions4: [false,
        [
          //Validators.required,
        ]],
      descriptions5: [false,
        [
          //Validators.required,
        ]],
      minPrice: [0,
        [
          Validators.required,
          //Validators.minLength(8),
          //Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
        ]],
      maxPrice: [5000,
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
      b_status: [false,
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
      profile_status: [false,
        [
          //Validators.required,
        ]],

    });
  }
  test(){
    this.router.navigate(['/questionnaire'])
  }
  onSubmit() {
    
    //this.form.controls.descriptions.value+this.form.controls.descriptions1.value+this.form.controls.descriptions2.value+this.form.controls.descriptions3.value+this.form.controls.descriptions4.value+this.form.controls.descriptions5.value
    if(!this.form.valid){
      console.log("กรอกข้อมูลให้ครบดิวะ");
      console.log(this.form);
    }
    if (this.form.valid) {
      console.log("กรอกข้อมูลครบแล้ว")
      var sleepTime  = this.form.controls.sleep_time.value.toString();
      var splitTime = sleepTime.split(":");
      if(splitTime[0] == "00"){
        splitTime[0] = "24";
      }
      var minuteSleeptime = splitTime[0]*60 + splitTime[1]*1;
      console.log("This is b status : " + this.form.controls.b_status.value);
      console.log(minuteSleeptime);
      const user = {
        //image: this.form.controls.image.value,
        userDetails: this.auth.userDetails,
        religion: this.form.controls.religion.value,
        gender: this.form.controls.gender.value,
        birthday: this.form.controls.birthday.value,
        facebook: this.form.controls.facebook.value,
        tel: this.form.controls.tel.value,
        occupation: this.form.controls.occupation.value,
        sleep_time: minuteSleeptime,
        hobbies: this.form.controls.hobbies.value,
        address: this.form.controls.address.value,
        descriptions: this.form.controls.descriptions.value ,
        descriptions1: this.form.controls.descriptions1.value,
        descriptions2: this.form.controls.descriptions2.value,
        descriptions3: this.form.controls.descriptions3.value,
        descriptions4: this.form.controls.descriptions4.value,
        descriptions5: this.form.controls.descriptions5.value,
        minPrice: this.form.controls.minPrice.value,
        maxPrice: this.form.controls.maxPrice.value,
        r_status: this.form.controls.r_status.value,
        g_status: this.form.controls.g_status.value,
        b_status: this.form.controls.b_status.value,
        b_range: this.form.controls.b_range.value,
        profile_picture : this.profile.profile_picture,
        profile_status: true
      }
      const formData: any = new FormData();
      if(this.filesToUpload){
      const files = this.filesToUpload;
      formData.append("uploads", files);
      }
      
      var details = JSON.stringify(user);
      formData.append("data", details);
      console.log(user);

      this.auth.profile(formData).subscribe(res => {
        console.log(res);
      })
      if(this.profile.habit){
        this.router.navigate(['/main'])
      }else{
        this.router.navigate(['/questionnaire'])
      }
        
      

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


  fileChangeEvent(fileInput: any) {
    this.filesToUpload = fileInput.target.files[0];
    //this.product.photo = fileInput.target.files[0]['name'];
    console.log(this.filesToUpload);
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e : any) {
          document.getElementById("preview").setAttribute("src",e.target.result);
      }

      reader.readAsDataURL(fileInput.target.files[0]);
  }
}


}
