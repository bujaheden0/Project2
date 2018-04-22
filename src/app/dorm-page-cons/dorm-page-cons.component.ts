import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm, ReactiveFormsModule, FormsModule, SelectControlValueAccessor } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-dorm-page-cons',
  templateUrl: './dorm-page-cons.component.html',
  styleUrls: ['./dorm-page-cons.component.css']
})
export class DormPageConsComponent implements OnInit {

  Dorm: any;
  DormInfo: any;
  userInfo: any;
  map: google.maps.Map;
  seleteDorm:any;
  constructor(private route : ActivatedRoute,
    private auth: AuthenticationService,
    private router : Router) { }

  ngOnInit() {
    console.log("app.dormCons/ngOnInit")
    this.route.params.subscribe(id => {
      const data = {
        dorm_id : id.dormId
      }
      this.getSeletedDormInfo(id.dormId)
      
      this.auth.getPeopleHadDorm(data).subscribe(res => {
        console.log("app.dormCons/ngOnInit/getPeopleHadDorm res :"+res)
        console.log(res)
        this.DormInfo = res;
      })
   })
    

    // var map = new google.maps.Map(document.getElementById('map'), {
    //   zoom: 15,
    //   center: { lat: 7.894866, lng: 98.352092 },
    // });
  }
  
   //รับค่าจากหอ
   getSeletedDormInfo(dorm_id){
    console.log("app.dormCons/getSeletedDormInfo dorm_id :"+dorm_id);
    this.auth.getDorm().subscribe(res => {
      this.Dorm = res;
      var marker;
      var obj = Object.keys(this.Dorm).length;

      for (let i = 0; i < obj; i++) {
        if (this.Dorm[i]._id == dorm_id) {
         this.seleteDorm = this.Dorm[i];
        //  this.name = this.Dorm[i].name;
         var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: { lat: this.Dorm[i].lat, lng: this.Dorm[i].long },
        });

        marker = new google.maps.Marker({
          position: { lat: this.Dorm[i].lat, lng: this.Dorm[i].long },
          map: map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          title: 'Hello World!'
        });
        }
      }
    })
  }
}

