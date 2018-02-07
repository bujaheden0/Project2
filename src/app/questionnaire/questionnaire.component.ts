import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { QUESTIONS } from '../mock-queslist';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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
  
  constructor() { }

  ngOnInit() {
  }

  onSelect(question: Question): void {
    this.selectedQuestion = question;
  }
  nextquestion(){
    this.count++;
    this.pb = this.pb + 2.5;
    this.percent = this.pb + "%";
  }

}
