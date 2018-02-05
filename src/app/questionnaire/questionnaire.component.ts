import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { QUESTIONS } from '../mock-queslist';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  questions = QUESTIONS;

  selectedQuestion: Question;

  constructor() { }

  ngOnInit() {
  }

  onSelect(question: Question): void {
    this.selectedQuestion = question;
  }
}
