import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
// import { LOCATIONS } from './mock-locationlist'
// import { Location } from './map'
import { FormBuilder, FormGroup, FormControl, Validators, NgForm, ReactiveFormsModule, FormsModule, SelectControlValueAccessor } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-dorm-page',
  templateUrl: './dorm-page.component.html',
  styleUrls: ['./dorm-page.component.css']
})
export class DormPageComponent implements OnInit {
  router: any;
  Dorm=[];

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.getDorm().subscribe(res => {
      this.Dorm = res;
      var obj = Object.keys(this.Dorm).length;
    })
  }
  swapMain(){
    this.router.navigate(['/main'])
  }

}
