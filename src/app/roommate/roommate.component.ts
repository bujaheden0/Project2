import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatchingService } from '../services/matching.service';
@Component({
  selector: 'app-roommate',
  templateUrl: './roommate.component.html',
  styleUrls: ['./roommate.component.css']
})
export class RoommateComponent implements OnInit {
  userInfo;
  show = false;
  constructor(private match : MatchingService,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(id => {
      const data = {
        id : id.roommateId
      }
      this.match.getRoommateInfo(data).subscribe(res => {
        this.userInfo = res;
        this.check_description(this.userInfo);
        this.getAgeFromBirthDay(this.userInfo);
        this.getMinutesSleepTimeForHousandMinutes(this.userInfo);
      })
    })
    }

    showInformation(){
      console.log(this.show);
      this.show = !this.show;
    }

    check_description(user){
      if(user.details.descriptionsEx.c1){
        user.details.descriptionsEx.text1 = "สูบบุหรี่ได้"
      } 
      
      if(user.details.descriptionsEx.c2){
        user.details.descriptionsEx.text2 = "ละเลยการทำความสะอาดได้"
      } 
      
      if(user.details.descriptionsEx.c3){
        user.details.descriptionsEx.text3 = "เลี้ยงสัตว์ได้"
      } 
      
      if(user.details.descriptionsEx.c4){
        user.details.descriptionsEx.text4 = "ส่งเสียงดังได้"
      } 
      
      if(user.details.descriptionsEx.c5){
        user.details.descriptionsEx.text5 = "พาเพื่อนเข้าห้องได้"
      }
  }
  
  getAgeFromBirthDay(user){
    var ageDifMs = Date.now() - new Date(user.details.birthDate).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    user.details.age = Math.abs(ageDate.getUTCFullYear() - 1970);
    console.log(user.details.age);
  }
  
  getMinutesSleepTimeForHousandMinutes(user){
    var sleepTime = user.details.sleep_time;
    var hours = Math.floor(sleepTime/60).toString();
    if(hours == '24'){
      hours = '00';
    }
    var minutes = (sleepTime % 60).toString();
    if(minutes == "0"){
      minutes = minutes + "0";
    }
    user.details.sleep_time = `${hours}.${minutes}`;
  }

}
