import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MatchingService } from '../services/matching.service';
@Component({
  selector: 'app-user-matched',
  templateUrl: './user-matched.component.html',
  styleUrls: ['./user-matched.component.css']
})
export class UserMatchedComponent implements OnInit {
  matchedPeople;
  userInfo;
  show = false;
  constructor(private route : ActivatedRoute,
              private auth : AuthenticationService,
              private matching : MatchingService) { }

  ngOnInit() {
    this.route.params.subscribe(id => {
      const data = {
        actionerId : id.userId,
        user : this.auth.userDetails,
        messageId : id.messageId
      }
      this.matching.findMatchedPeopleInfo(data).subscribe(res => {
          this.userInfo = res[0];
          console.log(this.matchedPeople);
          this.check_description(this.userInfo);
          this.getAgeFromBirthDay(this.userInfo);
          this.getMinutesSleepTimeForHousandMinutes(this.userInfo);
          if(data.actionerId !== this.matchedPeople[0].actioner._id){
            this.matchedPeople[0].actioner.tel = this.matchedPeople[0].victim.tel
            this.matchedPeople[0].actioner.details.facebook  = this.matchedPeople[0].victim.details.facebook
          }
      })


      this.matching.setReadStatus(data).subscribe(res => {
        console.log(res);
      })

    })
  }

  check_description(user){
    if(user[0].details.descriptionsEx.c1){
      user[0].details.descriptionsEx.text1 = "สูบบุหรี่ได้"
    } 
    
    if(user[0].details.descriptionsEx.c2){
      user[0].details.descriptionsEx.text2 = "ละเลยการทำความสะอาดได้"
    } 
    
    if(user[0].details.descriptionsEx.c3){
      user[0].details.descriptionsEx.text3 = "เลี้ยงสัตว์ได้"
    } 
    
    if(user[0].details.descriptionsEx.c4){
      user[0].details.descriptionsEx.text4 = "ส่งเสียงดังได้"
    } 
    
    if(user[0].details.descriptionsEx.c5){
      user[0].details.descriptionsEx.text5 = "พาเพื่อนเข้าห้องได้"
    }
}

getAgeFromBirthDay(user){
  var ageDifMs = Date.now() - new Date(user[0].details.birthDate).getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  user[0].details.age = Math.abs(ageDate.getUTCFullYear() - 1970);
  console.log(user[0].details.age);
}

getMinutesSleepTimeForHousandMinutes(user){
  var sleepTime = user[0].details.sleep_time;
  var hours = Math.floor(sleepTime/60).toString();
  if(hours == '24'){
    hours = '00';
  }
  var minutes = (sleepTime % 60).toString();
  if(minutes == "0"){
    minutes = minutes + "0";
  }
  user[0].details.sleep_time = `${hours}.${minutes}`;
}

showInformation(){
  console.log(this.show);
  this.show = !this.show;
}

}
