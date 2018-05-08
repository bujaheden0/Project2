import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm, ReactiveFormsModule, FormsModule, SelectControlValueAccessor } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MatchPeopleService } from '../services/match-people.service';
import { MatchingService } from '../services/matching.service';

@Component({
  selector: 'app-dorm-page-cons',
  templateUrl: './dorm-page-cons.component.html',
  styleUrls: ['./dorm-page-cons.component.css']
})
export class DormPageConsComponent implements OnInit {
  userDetails;
  Dorm: any;
  DormInfo: any;
  userInfo: any;
  map: google.maps.Map;
  seleteDorm: any;
  sendDorm_id: string;
  reserveStatus = false;
  text;
  messages;
  firstname;
  // latitude: any;
  // longitude: any;
   singles;
   perfectUser;
   possibleUser;
   leastUser;
   perfectUser_hadDorm;
   possibleUser_hadDorm;
   leastUser_hadDorm;
   currentUser;
   selectedPerfectUserInfo;
   selectedPossibleUserInfo;
   selectedLeastUserInfo;
   selectedPerfectUserInfo_hadDorm;
   selectedPossibleUserInfo_hadDorm;
   selectedLeastUserInfo_hadDorm;
   show_hadDorm = false;
  constructor(private route: ActivatedRoute,
    private auth: AuthenticationService,
    private router: Router,
    private matchPeople : MatchPeopleService,
    private matching : MatchingService) { }

  ngOnInit() {
    console.log("Run app.dormCons/ngOnInit")
    if(this.auth.userDetails){
      this.auth.getProfile().subscribe(res => {
        this.currentUser = res;
        console.log("currentUser._id :"+this.currentUser._id);
      })
    }
    this.route.params.subscribe(id => {
      const data = {
        dorm_id: id.dormId
      }
      this.getSeletedDormInfo(id.dormId)

      this.auth.getPeopleHadDorm(data).subscribe(res => {
        console.log("Run app.dormCons/ngOnInit/getPeopleHadDorm parameter :" + res)
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
  getSeletedDormInfo(dorm_id) {
    console.log("Run app.dormCons/getSeletedDormInfo parameter :" + dorm_id);
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
    this.sendDorm_id = dorm_id;

  }

  onSubmit() {
    console.log("Run app.dormCons/onSubmit");
    const data = {
      userDetails : this.auth.userDetails
    }

    this.auth.checkDormId(data).subscribe(res => {
      this.userDetails = res;
      console.log(this.userDetails._id);
    for (let i = 0; i < this.DormInfo.length; i++) {
      if (this.DormInfo[i].user._id == this.userDetails._id) {
        this.reserveStatus = true;
      }
    }
    if (this.reserveStatus == true) {
      window.alert("คุณรออยู่ที่หอนี้อยู่แล้ว");
    }
    else {
      var answer = confirm("คุณแน่ใจที่จะรออยู่ที่หอนี้?");
      if (answer) {
        const user = {
          user: this.userDetails._id, //ไอเเดงๆนี่มันเเก้ไงอะ หรือ มันดึงค่า ไอดีได้จากที่อื่น
          dorm: this.sendDorm_id
        }
        this.auth.createReserve(user).subscribe(res => {
          console.log(res);
        })
      }
    }
    })
  }

//รับค่าจาก คนที่เลือก
getPerfectUserInfo(user_id){
  console.log("app/dormpagecon/ts this.currentUser._id :" +this.currentUser._id);
  console.log(user_id);
    const data = {
      userid  : user_id,
    }
    console.log(data);
  this.auth.getSeletePeopleinDorm(data).subscribe(res => {
    //  console.log("Run app.dormCons/ngOnInit/getPeopleHadDorm res :" + res)
     this.userInfo = res;
    console.log("userInfo return userInfo:"+this.userInfo);
  })
}

  addInterestedPeople(actioner,victim,type){
    console.log("Run app/addInterestedPeople/ts")
    console.log(actioner);
    console.log(victim);
    const data = {
      actioner : actioner,
      victim : victim,
      status : "isMatching"
    }
    // this.matching.addInterestedPeople(data).subscribe(res => {
    //   console.log(res);
    // })

    this.matching.check_ifIsMatching(data).subscribe(res => {
      console.log(res.length);
      if(res.length == 0){
        if(type == 1){
          var answer = confirm("คุณต้องการที่จะอยู่กับคนนี้");
        if(answer){
          this.matching.addInterestedPeople(data).subscribe(res => {
            console.log(res);
          })
        }
        } else {
          this.matching.addInterestedPeople(data).subscribe(res => {
            console.log(res);
          })
        }
      } else {
      if(res[0].status == "isMatching"){
        alert("คุณได้ทำการกดสนใจบุคคลนี้ไปแล้ว รอคำตอบรับของอีกฝ่่าย");
      } else {
        if(type == 1){
          var answer = confirm("คุณต้องการที่จะอยู่กับคนนี้");
        if(answer){
          this.matching.addInterestedPeople(data).subscribe(res => {
            console.log(res);
          })
        }
        } else {
          this.matching.addInterestedPeople(data).subscribe(res => {
            console.log(res);
          })
        }
      }
      }


    })
    
  }

}

