import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { QUESTIONS } from '../mock-queslist';
import { MBTIS } from '../mock-mbtilist';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  questions = QUESTIONS;
  mbtis = MBTIS;
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
  habittitle: string = "";
  habitdetail: string = "";

  constructor() { }

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
    for (let mbti of this.mbtis) {
      //console.log(mbti.name);
      if (this.habit === mbti.name) {
        this.habittitle = mbti.title;
        this.habitdetail = mbti.detail;

      }
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
    for (let mbti of this.mbtis) {
      //console.log(mbti.name);
      if (this.habit === mbti.name) {
        this.habittitle = mbti.title;
        this.habitdetail = mbti.detail;
      }
    }
  }

}
