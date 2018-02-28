import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { QUESTIONS } from '../mock-queslist';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Mbti16typedatailService } from '../services/mbti16typedatail.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  questions = QUESTIONS;
  selectedQuestion: Question;
  count = 0;
  pb = 0;
  percent: string;
  type1: string = "";
  type2: string = "";
  type3: string = "";
  type4: string = "";
  score1 = 0;
  score2 = 0;
  public habit: string = "";
  habitdetail: string = "";

  constructor(private mbtiservice : Mbti16typedatailService, private auth: AuthenticationService) { }

  ngOnInit() {
    
  }

  nextquestion1() {
    this.count++;
    this.pb = this.pb + 2.5;
    this.percent = this.pb + "%";


    if (this.count == 2) {
      this.score1 == this.score1;
    } else if (this.count == 16) {
      this.score1 == this.score1;
    } else if (this.count == 26) {
      this.score1 == this.score1;
    } else if (this.count == 35) {
      this.score1 == this.score1;
    } else {
      this.score1 = this.score1 + 1;
    }

    if (this.count == 10) {
      if (this.score1 >= this.score2) {
        this.type1 = "E";
      } else {
        this.type1 = "I";
      }
      console.log(this.type1);
      this.score1 = 0;
    } else if (this.count == 20) {
      if (this.score1 >= this.score2) {
        this.type2 = "S";
      } else {
        this.type2 = "N";
      }
      console.log(this.type2);
      this.score1 = 0;
    } else if (this.count == 30) {
      if (this.score1 >= this.score2) {
        this.type3 = "T";
      } else {
        this.type3 = "F";
      }
      console.log(this.type3);
      this.score1 = 0;
    } else if (this.count == 40) {
      if (this.score1 >= this.score2) {
        this.type4 = "J";
      } else {
        this.type4 = "P";
      }
      console.log(this.type4);
      this.score1 = 0;
      
    }
    
    this.habit = this.type1 + this.type2 + this.type3 + this.type4;
    // for (let mbti of this.mbtis) {
    //   //console.log(mbti.name);
    //   if (this.habit === mbti.name) {
    //     this.habittitle = mbti.title;
    //     this.habitdetail = mbti.detail;

    //   }
    // }
    if(this.habit.length == 4){
      this.mbtiservice.getmbtitype(this.habit).subscribe(result => {
        let displays =  result.split("\n");
        let bigTab = "";
        let smallTab = "";
        const space = "&nbsp;";
        for(let i = 0; i< 10 ; i++){
          smallTab = smallTab +space;
        }
        bigTab = smallTab + smallTab;

        displays[0] = displays[0].bold();
        for(let i = 0 ; i< displays.length; i++){
          let tab : string;
          if(i==0){
            tab = bigTab;
          }else{
            tab = smallTab;
          }
          displays[i] = displays[i].replace("    ",tab);
          displays[i] = displays[i].replace("ข้อควรระวัง :", "ข้อควรระวัง :".bold());
          displays[i] = displays[i].replace("ข้อแนะนำ:", "ข้อแนะนำ:".bold());          
          displays[i] = displays[i].replace("อาชีพที่เหมาะสมกับลักษณะบุคลิกภาพ :", "อาชีพที่เหมาะสมกับลักษณะบุคลิกภาพ :".bold());
          // console.log("line"+i+" "+displays[i]);
        }
        this.habitdetail = displays.join("<br>");
         console.log(this.habitdetail);
      });
    }
  }

  nextquestion2() {
    this.count++;
    this.pb = this.pb + 2.5;
    this.percent = this.pb + "%";

    if (this.count == 2) {
      this.score2 == this.score2;
    } else if (this.count == 16) {
      this.score2 == this.score2;
    } else if (this.count == 26) {
      this.score2 == this.score2;
    } else if (this.count == 35) {
      this.score2 == this.score2;
    } else {
      this.score2 = this.score2 + 1;
    }

    if (this.count == 10) {
      if (this.score2 >= this.score1) {
        this.type1 = "I";
      } else {
        this.type1 = "E";
      }
      console.log(this.type1);
      this.score2 = 0;
    } else if (this.count == 20) {
      if (this.score2 >= this.score1) {
        this.type2 = "N";
      } else {
        this.type2 = "S";
      }
      console.log(this.type2);
      this.score2 = 0;
    } else if (this.count == 30) {
      if (this.score2 >= this.score1) {
        this.type3 = "F";
      } else {
        this.type3 = "T";
      }
      console.log(this.type3);
      this.score2 = 0;
    } else if (this.count == 40) {
      if (this.score2 >= this.score1) {
        this.type4 = "P";
      } else {
        this.type4 = "J";
      }
      console.log(this.type4);
      this.score2 = 0;
    }
    this.habit = this.type1 + this.type2 + this.type3 + this.type4;
    console.log(this.habit)
    // for (let mbti of this.mbtis) {
    //   //console.log(mbti.name);
    //   if (this.habit === mbti.name) {
    //     this.habittitle = mbti.title;
    //     this.habitdetail = mbti.detail;
    //   }
    // }
    if(this.habit.length == 4){
      this.mbtiservice.getmbtitype(this.habit).subscribe(result => {
        let displays =  result.split("\n");
        let bigTab = "";
        let smallTab = "";
        const space = "&nbsp;";
        for(let i = 0; i< 10 ; i++){
          smallTab = smallTab +space;
        }
        bigTab = smallTab + smallTab;

        displays[0] = displays[0].bold();
        for(let i = 0 ; i< displays.length; i++){
          let tab : string;
          if(i==0){
            tab = bigTab;
          }else{
            tab = smallTab;
          }
          displays[i] = displays[i].replace("    ",tab);
          displays[i] = displays[i].replace("ข้อแนะนำ:", "ข้อแนะนำ:".bold());
          displays[i] = displays[i].replace("ข้อควรระวัง:", "ข้อควรระวัง:".bold());
          displays[i] = displays[i].replace("อาชีพที่เหมาะสมกับลักษณะบุคลิกภาพ :", "อาชีพที่เหมาะสมกับลักษณะบุคลิกภาพ :".bold());
          // console.log("line"+i+" "+displays[i]);
        }
        this.habitdetail = displays.join("<br>");
         console.log(this.habitdetail);
      });
    }
  }

  Cancel() {
    this.count = 0;
    this.habit = "";
    this.habitdetail = ""
    this.type1 = "";
    this.type2 = "";
    this.type3 = "";
    this.type4 = "";
    this.pb = 0;
  }
  SendHabit(){
    const user = {
      userDetails: this.auth.userDetails,
      habit: this.habit
    }
    console.log(user);
    this.auth.habit(user).subscribe(res => {
      console.log(res);
    })

  }
}
