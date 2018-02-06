import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators,NgForm } from '@angular/forms';
import { group,trigger,style,transition,animate,keyframes,query,stagger,state } from '@angular/animations';
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
      animate(1000)
      ])
    ])
  
    
  ]
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  isValid = false;
  constructor(private fb: FormBuilder) { 
      
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
      firstname: [null, [Validators.required, Validators.minLength(2),Validators.pattern(/([a-zA-Zก-๙])/)]],
      lastname: [null, [Validators.required, Validators.minLength(2)]],
      email:[null,[Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      username:[null, [Validators.required, Validators.pattern("^[a-z0-9_-]{10,15}$")]],
      password:[null, [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit(){
    console.log(this.form);
    if(this.form.valid){
      this.isValid = true;
    }
  }

}
