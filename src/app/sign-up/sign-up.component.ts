import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { group,trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
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

    ])
  ]
})
export class SignUpComponent implements OnInit {

  form: FormGroup;
  constructor(@Inject(FormBuilder) fb: FormBuilder) { 
      this.form = fb.group({
        name: fb.group({
          first: [null, [Validators.required, Validators.minLength(2)]],
          last: [null, [Validators.required, Validators.minLength(2)]]
        }),
        email:[null,[Validators.required, Validators.email]],
        username:[null, [Validators.required]],
        password:[null, [Validators.required, Validators.minLength(6)]]
      })
  }

  ngOnInit() {
  }

}
