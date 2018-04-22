import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm, ReactiveFormsModule, FormsModule, SelectControlValueAccessor } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-dorm-page',
  templateUrl: './dorm-page.component.html',
  styleUrls: ['./dorm-page.component.css']
})
export class DormPageComponent implements OnInit {
  Dorm: any;
  map: google.maps.Map;
  seleteDorm:any;
  constructor(private route : ActivatedRoute,
    private auth : AuthenticationService,
    private router : Router) { }

  ngOnInit() {
    this.auth.getDorm().subscribe(res => {
      this.Dorm = res;
      var obj = Object.keys(this.Dorm).length;
    })
    // var map = new google.maps.Map(document.getElementById('map'), {
    //   zoom: 15,
    //   center: { lat: 7.894866, lng: 98.352092 },
    // });
  }
  
   //รับค่าจากหอ
   getSeletedDormInfo(dorm_id){
     console.log(dorm_id);
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

  getPeopleHadDorm(dorm_id){
    console.log("dorm/getPeopleHadDorm Dorm Id : " + dorm_id);
    this.route.params.subscribe(id => {
      const data = {
        dormId : id.dorm_id
      }
      this.auth.getPeopleHadDorm(data).subscribe(res => {
        console.log("dorm/getPeopleHadDorm/getPeopleHadDorm id.dorm_id :"+dorm_id);
        this.router.navigate(['/dormCons/' + dorm_id ]);
      })

    });
    // const data = {
    //   dorm_id : dorm_id
    // }
    // this.auth.getPeopleHadDorm(data).subscribe(res => {
    //   console.log("dorm/getPeopleHadDorm/getPeopleHadDorm");
    //   this.router.navigate(['/dormCons'])
    // })
  }
}
