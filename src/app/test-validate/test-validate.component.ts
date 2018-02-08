import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-test-validate',
  templateUrl: './test-validate.component.html',
  styleUrls: ['./test-validate.component.css']
})
export class TestValidateComponent implements OnInit {
  form: FormGroup;

  constructor(private fb : FormBuilder) {
    this.form = fb.group({
      name: fb.group({
        first: ['Nancy', Validators.minLength(2)],
        last: 'Drew',
      }),
      email: '',
    });
   }

  ngOnInit() {
  }

}
