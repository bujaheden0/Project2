import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatchingService } from '../services/matching.service';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-interested-people',
  templateUrl: './interested-people.component.html',
  styleUrls: ['./interested-people.component.css']
})
export class InterestedPeopleComponent implements OnInit {
  interestedPeople;
  constructor(private route : ActivatedRoute,
              private matching : MatchingService,
              private auth : AuthenticationService,
              private router : Router) { }

  ngOnInit() {
    this.route.params.subscribe(id => {
      const data = {
        id : id.userId,
        messageId : id.messageId
      }
      this.matching.getInterestedPeople(data).subscribe(res => {
        this.interestedPeople = res;
        this.check_description(this.interestedPeople);
        this.getAgeFromBirthDay(this.interestedPeople);
        this.getMinutesSleepTimeForHousandMinutes(this.interestedPeople);
        console.log(this.interestedPeople);
      })

      this.matching.setReadStatus(data).subscribe(res => {
        console.log(res);
      })


    })
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
      var minutes = sleepTime % 60;
      minutes.toString();
      user.details.sleep_time = `${hours}.${minutes}`;
  }

  agreeButton(){
    var answer = confirm("คุณต้องการที่จะอยู่กับคนนี้");
    if(answer){
      this.route.params.subscribe(id => {
        const data = {
          actionId : id.userId,
          victim : this.auth.userDetails
        }

        this.matching.updateUserStatus_Matched(data).subscribe(res => {
          console.log(res);
        })
        this.matching.updateMatchingStatus_agree(data).subscribe(res => {
          this.router.navigate(['/userMatched/' + id.userId + '/' + id.messageId]);
        })

      });
    }
  }

  rejectButton(){
    var answer = confirm("คุณแน่ใจว่าจะปฏิเสธบุคคลนี้");
    if(answer){
    this.route.params.subscribe(id => {
      const data = {
        actionId : id.userId,
        victim : this.auth.userDetails
      }
      this.matching.updateMatchingStatus_reject(data).subscribe(res => {
        this.router.navigate(['/main'])
      })

    });
  }
}
}