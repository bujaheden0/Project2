import { Component, OnInit, ViewChild  } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { MatchPeopleService } from '../services/match-people.service';
import { MatchingService } from '../services/matching.service';
import { } from '@types/googlemaps';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  // map: google.maps.Map;
  text;
  messages;
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
   had_roommate = false;
   roommate;
   roommate_id;
  constructor(private auth : AuthenticationService,
              private matchPeople : MatchPeopleService,
              private matching : MatchingService) { }

  ngOnInit() {
    if(this.auth.userDetails){
      this.auth.getProfile().subscribe(res => {
        this.currentUser = res;
        const data = {
          id : this.currentUser._id
        }

        this.had_roommate = this.currentUser.matchedStatus;
        if(this.had_roommate){
          this.matching.getRoommate(data).subscribe(res1 => {
            this.roommate = res1[0];
            if(this.currentUser._id === this.roommate[0].actioner._id){
              this.roommate_id = this.roommate[0].victim._id;
            } else {
              this.roommate_id = this.roommate[0].actioner._id;
            }
            console.log("THIS IS A ROOMMATE ID : " +this.roommate_id);
          })
        }
        this.getAllMatchedPeople();
        setInterval(() => {
        this.findMessage()},1000);
      })
    }

    console.log("I am a main page");
    }

    onSubmit(){
      console.log(this.singles);
    }
    findMessage(){
      const data = {
        id : this.currentUser._id
      }
      this.matching.findMessage(data).subscribe(res => {
        this.messages = res;
        this.matching.save(this.messages);
      })
    }
  //รับค่า Array ทุกนิสัยที่ Matched กับ นิสัยที่ log in
  getAllMatchedPeople(){
    const data = {
      userDetails : this.auth.userDetails
    }
    // Get User ที่แมชกับนิสัย Current User
    this.matchPeople.getAllMatchedPeople(data).subscribe(res => {
      this.perfectUser = res[0];
      this.possibleUser = res[1];
      this.leastUser = res[2];
      console.log("ไม่มีหอ");
      console.log(res);
      // แปลงค่าวันเกิดให้เป็นอายุ
      this.getAgeFromBirthDay(this.perfectUser,1);
      this.getAgeFromBirthDay(this.possibleUser,1);
      this.getAgeFromBirthDay(this.leastUser,1);
      // เริ้มต้นการกรองด้วยเพศก่อน
      this.filter_gender_Property(this.currentUser,this.perfectUser);
      this.filter_gender_Property(this.currentUser,this.possibleUser);
      this.filter_gender_Property(this.currentUser,this.leastUser);

      // เอา User ที่กรอง ไปค้นหา user ที่มีหอ
      const matchedUser = {
        perfectUser : this.perfectUser,
        possibleUser : this.possibleUser,
        leastUser : this.leastUser
      }
      // นำ User ไปค้นหา User ที่มี หออยู่
      this.matchPeople.postMatchPeopleforQueries_user_hadDorm(matchedUser).subscribe(res => {
          this.perfectUser_hadDorm = res[0];
          this.possibleUser_hadDorm = res[1];
          this.leastUser_hadDorm = res[2];
          console.log("มีหอ");
          console.log(this.possibleUser_hadDorm);
          if((this.perfectUser_hadDorm.length || this.possibleUser_hadDorm.length || this.leastUser_hadDorm.length) > 0 ){
            this.show_hadDorm = true;
          }
          console.log(res);
          // นำไปเช็คว่าถ้ามี User ซ้ำกับ User ที่ไม่มีหอ ให้เอา User คนนั้นออก
          this.checkIfArrays_areEqual(this.perfectUser,this.perfectUser_hadDorm );
          this.checkIfArrays_areEqual(this.possibleUser,this.possibleUser_hadDorm);
          this.checkIfArrays_areEqual(this.leastUser,this.leastUser_hadDorm);
          // แปลงค่าจากวันเกิดเป็นอายุ
          this.getAgeFromBirthDay(this.perfectUser_hadDorm,2);
          this.getAgeFromBirthDay(this.possibleUser_hadDorm,2);
          this.getAgeFromBirthDay(this.leastUser_hadDorm,2);
          // แปลงค่าจากนาที่เป็น ชั่วโมงและนาที
          this.getMinutesSleepTimeForHousandMinutes(this.perfectUser,1);
          this.getMinutesSleepTimeForHousandMinutes(this.possibleUser,1);
          this.getMinutesSleepTimeForHousandMinutes(this.leastUser,1);
          // แปลงค่าจากนาที่เป็น ชั่วโมงและนาที
          this.getMinutesSleepTimeForHousandMinutes(this.perfectUser_hadDorm,2);
          this.getMinutesSleepTimeForHousandMinutes(this.possibleUser_hadDorm,2);
          this.getMinutesSleepTimeForHousandMinutes(this.leastUser_hadDorm,2);

          this.check_description(this.perfectUser,1);
          this.check_description(this.possibleUser,1);
          this.check_description(this.leastUser,1);

          this.check_description(this.perfectUser_hadDorm,2);
          this.check_description(this.possibleUser_hadDorm,2);
          this.check_description(this.leastUser_hadDorm,2);
      })
    })
  }

  //รับค่าจากนิสัยที่เป็นไปได้มากที่สุด
  getPerfectUserInfo(user_id : any,type){
    console.log(user_id);
    console.log(type);
    if(type == 1){
    this.perfectUser.forEach(user => {
      if(user_id === user._id){
        this.selectedPerfectUserInfo = user;
        console.log(this.selectedPerfectUserInfo);
        return;
      }
    });
    } else {
      this.perfectUser_hadDorm.forEach(user => {
        if(user_id === user.user._id){
          this.selectedPerfectUserInfo_hadDorm = user;
          console.log(this.selectedPerfectUserInfo_hadDorm.user.firstname);
         // map 
          var map = new google.maps.Map(document.getElementById('map1'), {
            zoom: 15,
            center: { lat: this.selectedPerfectUserInfo_hadDorm.dorm.lat, lng: this.selectedPerfectUserInfo_hadDorm.dorm.long },
          });
          var marker = new google.maps.Marker({
            position: { lat: this.selectedPerfectUserInfo_hadDorm.dorm.lat, lng: this.selectedPerfectUserInfo_hadDorm.dorm.long },
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            title: 'Hello World!'
          });

          return;
        }
      });
    }
  }

  //รับค่าจากนิสัยที่เป็นไปได้ปานกลาง
  getPossibleUserInfo(user_id : any,type){
    if(type == 1){
    this.possibleUser.forEach(user => {
      if(user_id === user._id){
        this.selectedPossibleUserInfo = user;
        console.log(this.selectedPossibleUserInfo);
        return;
      }
    });
    } else {
      this.possibleUser_hadDorm.forEach(user => {
        if(user_id === user.user._id){
          this.selectedPossibleUserInfo_hadDorm = user;
          console.log(this.selectedPossibleUserInfo_hadDorm.dorm.name);
         // map 
          var map = new google.maps.Map(document.getElementById('map2'), {
            zoom: 15,
            center: { lat: this.selectedPossibleUserInfo_hadDorm.dorm.lat, lng: this.selectedPossibleUserInfo_hadDorm.dorm.long },
          });
          var marker = new google.maps.Marker({
            position: { lat: this.selectedPossibleUserInfo_hadDorm.dorm.lat, lng: this.selectedPossibleUserInfo_hadDorm.dorm.long },
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            title: 'Hello World!'
          });

          return;
        }
      });
    }
  }

  //รับค่าจากนิสัยที่เป็นไปได้น้อยที่สุด
  getLeastUserInfo(user_id : any,type){
    if(type == 1){
    this.leastUser.forEach(user => {
      if(user_id === user._id){
        this.selectedLeastUserInfo = user;
        console.log(this.selectedLeastUserInfo);
        return;
      }
    });
    } else {
      this.leastUser_hadDorm.forEach(user => {
        if(user_id === user.user._id){
          this.selectedLeastUserInfo_hadDorm = user;
          console.log(this.selectedLeastUserInfo);
          // map 
          var map = new google.maps.Map(document.getElementById('map3'), {
            zoom: 15,
            center: { lat: this.selectedLeastUserInfo_hadDorm.dorm.lat, lng: this.selectedLeastUserInfo_hadDorm.dorm.long },
          });
          var marker = new google.maps.Marker({
            position: { lat: this.selectedLeastUserInfo_hadDorm.dorm.lat, lng: this.selectedLeastUserInfo_hadDorm.dorm.long },
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            title: 'Hello World!'
          });

          return;
        }
      });
    } 
  }

  //แปลงค่าจากวันเกิดเป็นอายุ
  getAgeFromBirthDay(user = [],type){
    if(type == 1){
    user.forEach(user => {
      var ageDifMs = Date.now() - new Date(user.details.birthDate).getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      user.details.age = Math.abs(ageDate.getUTCFullYear() - 1970);
      return;
    })
    } else {
      user.forEach(user => {
        var ageDifMs = Date.now() - new Date(user.user.details.birthDate).getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        user.user.details.age = Math.abs(ageDate.getUTCFullYear() - 1970);
        return;
      })
    }
  }

  getMinutesSleepTimeForHousandMinutes(user = [],type){
    if(type == 1){
    user.forEach(user => {
      var sleepTime = user.details.sleep_time;
      var hours = Math.floor(sleepTime/60).toString();
      if(hours == '24'){
        hours = '00';
      }
      var minutes = (sleepTime % 60).toString();
      if(minutes == "0") minutes = minutes + "0";
      user.details.sleep_time = `${hours}.${minutes}`;
      return;
    })
    } else {
      user.forEach(user => {
        var sleepTime = user.user.details.sleep_time;
        var hours = Math.floor(sleepTime/60).toString();
        if(hours.length == 1){
          hours = `0${hours}`;
        }
        if(hours == '24'){
          hours = '00';
        }
        var minutes = (sleepTime % 60).toString();

        if(minutes.length == 1){
          minutes = `0${minutes}`;
        }
        minutes.toString();
        user.user.details.sleep_time = `${hours}.${minutes}`;
        return;
      })
    } 
  }

  //กรองเพศ
  filter_gender_Property(currentUser,user = []){
    for(var i = user.length - 1; i >= 0; --i){
      //ถ้า Status = fasle เพศที่ไม่ใช่เพศเดียวกันกับ User ให้เอาออกทั้งหมด
      if(!this.currentUser.details.g_status){
        if(user[i].details.gender !== this.currentUser.details.gender){
          user.splice(i,1);
        }
      }
      //ถ้า Status = true แต่สถานะฝั่งตรงข้ามเป็น false ก้อให้เอาออก
      if(this.currentUser.details.g_status && !user[i].details.g_status){
        if(user[i].details.gender !== this.currentUser.details.gender){
          user.splice(i,1);
        }
      }

    }
    this.filter_religion_Property(this.currentUser,user);
  }

  //กรองศาสนา
  filter_religion_Property(currentUser,user = []){
    for(var i = user.length - 1; i >= 0; --i){
      //ถ้า Status = fasle ศาสนาที่ไม่ใช่ศาสนาเดียวกันกับ User ให้เอาออกทั้งหมด
      if(!this.currentUser.details.r_status){
        if(user[i].details.religion !== this.currentUser.details.religion){
          user.splice(i,1);
        }
      }
      //ถ้า Status = true แต่สถานะฝั่งตรงข้ามเป็น false ก้อให้เอาออก
      if(this.currentUser.details.r_status && !user[i].details.r_status){
        if(user[i].details.religion !== this.currentUser.details.religion){
          user.splice(i,1);
        }
      }

    }
    this.filter_age_Property(this.currentUser,user);
  }

  //กรองอายุ
  filter_age_Property(currentUser,user = []){
    var ageDifMsCurrentUser = Date.now() - new Date(this.currentUser.details.birthDate).getTime();
    var ageDateCurrentUser = new Date(ageDifMsCurrentUser); // miliseconds from epoch
    this.currentUser.details.age = Math.abs(ageDateCurrentUser.getUTCFullYear() - 1970);
    var normalAge = this.currentUser.details.age;
    var plusAge = normalAge + this.currentUser.details.b_range;
    var minusAge = normalAge - this.currentUser.details.b_range;
    for(var i = user.length - 1; i >= 0; --i){
      //ถ้าสเตตัสเป็น false ให้ตัดอายุที่ไม่ตรงกับ user ออกให้หมด
      if(!this.currentUser.details.b_status){
        if(user[i].details.age != this.currentUser.details.age){
          user.splice(i,1);
        }
      }

      //สถานะ Current Userเป็น true
      if(this.currentUser.details.b_status){
        //ถ้าสถานะ Match Users เป็น true
        if(user[i].details.b_status){
          // Users ที่ matched จะต้องมีอายุที่อยู่ระหว่างช่วงอายุที่ currentUser ต้องการ
        if((minusAge <= user[i].details.age) && (user[i].details.age <= plusAge)){
          console.log("this is plusAge : " + plusAge);
          console.log(user[i].details.age);
          // ถ้าอายุของ Users มากกว่า Current Uer
          if(user[i].details.age > normalAge){
            // คำนวณช่วงอายุที่ฝั่ง Users ต้องการจะอยู่ด้วยลบกันแล้วยังมากกว่าอายุของ Current User ให้เอาออก
            var rangeMinusAge = user[i].details.age - user[i].details.b_range;
            if(rangeMinusAge > normalAge){
              console.log("Index : " + i + " Name : " + user[i].firstname + " Lastname : " + user[i].lastname);
              console.log("Index : " + i + "This is splice User minus older than Current : " + user[i].details.age);
              user.splice(i,1);
            }
            // ถ้าอายุของ Users น้อยกว่า Current Uer
          } else if(user[i].details.age < normalAge){
            // คำนวณช่วงอายุที่ฝั่ง Users ต้องการจะอยู่ด้วยบวกกันแล้วยังน้อยกว่าอายุของ Current User ให้เอาออก
            var rangePlusAge = user[i].details.age + user[i].details.b_range;
            if(rangePlusAge < normalAge){
              console.log("Index : " + i + " Name : " + user[i].firstname + " Lastname : " + user[i].lastname);
              console.log("Index : " + i + "This is splice User plus younger than Current : " + user[i].details.age);
              user.splice(i,1);
            }
          }
        } else {
          console.log("this is splice User : " + user[i].details.age);
          user.splice(i,1);
        }
        // ถ้า Match Users สถานะเป็น false
      } else if(!user[i].details.b_status){
        //ให้เอาอายุที่ไม่เท่ากับ User ปัจจุบันออก
        if(user[i].details.age != this.currentUser.details.age){
          user.splice(i,1);
        }
      }
      }
    }
    this.filter_sleepTime_property(this.currentUser,user);
  }

  filter_sleepTime_property(currentUser,user = []){

    var sleepTime = Number(this.currentUser.details.sleep_time);
    var plusSleepTime = sleepTime + 120; 
    var minusSleepTime = sleepTime - 120; 
    
    //กรณี 1 ถ้า sleeptime เที่ยงคืนเป็นต้นไป หรือ ตี 1 ถึง ตี 2 
    // if((sleepTime >= 1440) || (sleepTime >= 60 && sleepTime <= 120)){
    //   console.log(minusSleepTime);
    //   var minusTime = 1440 + minusSleepTime;
    //   console.log(minusTime);
    //   for(var i = user.length - 1; i >= 0; --i){
    //     var userSleepTime = Number(user[i].details.sleep_time);
    //     if((userSleepTime >= 0) && (userSleepTime <= 240)){
    //       if(!((userSleepTime >= 0 ) && (userSleepTime <= plusSleepTime))){
    //         user.splice(i,1);
    //       }
    //     } else {
    //       if((minusTime >= userSleepTime)){
    //         user.splice(i,1);
    //       }
    //     }
    //   }
    // }
    
    //กรณี 2 ถ้า sleeptime มากกว่าหรือเท่ากับ 5 ทุ่ม
    if(sleepTime >= 1380){
      var plusTime = plusSleepTime - 1440;
      console.log("This is plus Sleep time : " + plusTime);
      for(var i = user.length - 1; i >= 0; --i){
        var userSleepTime = Number(user[i].details.sleep_time);
        if(userSleepTime >= plusTime){
          console.log("More Than plusTime Index : " + i + " Name : " + user[i].firstname + " " + user[i].lastname  + userSleepTime);
          if(!((minusSleepTime <= userSleepTime) && ( userSleepTime <= plusSleepTime))){
          console.log("Name : " + user[i].firstname + " " + user[i].lastname  + userSleepTime);
          user.splice(i,1);
          } 
        } else {
          console.log("Index : " + i + " Name : " + user[i].firstname + " " + user[i].lastname  + userSleepTime);
          if(!((0 <= userSleepTime) && ( userSleepTime <= plusTime))){
          console.log("Name : " + user[i].firstname + " " + user[i].lastname  + userSleepTime);
          user.splice(i,1);
          }
        }
        }
    }

    //กรณี 3 ตั้งแต่มากกว่าตี 2 แต่ไม่เกิน 5 ทุ่ม
    if((sleepTime > 120) && (sleepTime < 1380)){
      if(minusSleepTime < 60){
        minusSleepTime = minusSleepTime + 1440;
      }
      for(var i = user.length - 1; i >= 0; --i){
        var userSleepTime = Number(user[i].details.sleep_time);
        //ถ้าอยูู่ในช่วง 00.00 - 00.59
        if((userSleepTime > 1440) && (userSleepTime < 1500)){
          
          if(userSleepTime <= minusSleepTime){
            user.splice(i,1);
          }
        } else {
          // 60 - 1440 
          if(!((minusSleepTime <= userSleepTime) && (userSleepTime <= plusSleepTime))){
            user.splice(i,1);
          }
        }
      }
  }
  }

  checkIfArrays_areEqual(user = [], user_hadDorm = []){
    for (var i = user_hadDorm.length - 1; i >= 0; --i) {
        for (var j = user.length - 1; j >=0; --j) {
        if(user[j]._id == user_hadDorm[i].user._id){
            console.log("Index I : " + i);
            console.log("Index J : " + j);
            console.log("Firstname Nodorm : " + user[j].firstname);
            console.log("Lastname Nodorm : " + user[j].lastname);
            console.log("-----------------------------------------------------------------")
            user.splice(j,1);
        }
        }
    }
    }

  check_description(user = [],type){
    if(type == 1){
    for (var i = 0; i<user.length; i++){
      if(user[i].details.descriptionsEx.c1){
        user[i].details.descriptionsEx.text1 = "สูบบุหรี่ได้"
      } 
      
      if(user[i].details.descriptionsEx.c2){
        user[i].details.descriptionsEx.text2 = "ละเลยการทำความสะอาดได้"
      } 
      
      if(user[i].details.descriptionsEx.c3){
        user[i].details.descriptionsEx.text3 = "เลี้ยงสัตว์ได้"
      }
      
      if(user[i].details.descriptionsEx.c4){
        user[i].details.descriptionsEx.text4 = "ส่งเสียงดังได้"
      }
      
      if(user[i].details.descriptionsEx.c5){
        user[i].details.descriptionsEx.text5 = "พาเพื่อนเข้าห้องได้"
      }
    }
    } else if(type == 2){
      for (var i = 0; i<user.length; i++){
        if(user[i].user.details.descriptionsEx.c1){
          user[i].user.details.descriptionsEx.text1 = "สูบบุหรี่ได้"
        }
        
        if(user[i].user.details.descriptionsEx.c2){
          user[i].user.details.descriptionsEx.text2 = "ละเลยการทำความสะอาดได้"
        }
        
        if(user[i].user.details.descriptionsEx.c3){
          user[i].user.details.descriptionsEx.text3 = "เลี้ยงสัตว์ได้"
        } 
        
        if(user[i].user.details.descriptionsEx.c4){
          user[i].user.details.descriptionsEx.text4 = "ส่งเสียงดังได้"
        } 
        
        if(user[i].user.details.descriptionsEx.c5){
          user[i].user.details.descriptionsEx.text5 = "พาเพื่อนเข้าห้องได้"
        }
      }
    }
  }

  addInterestedPeople(actioner,victim,type){
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

      if(!this.currentUser.matchedStatus){
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
    } else {
      alert("คุณมีรูมเมทแล้วไม่สามารถ หารูมเมทคนใหม่ได้");
    }


    })
    
  }
  }
  




