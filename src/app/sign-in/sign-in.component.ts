import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  animations: [
    trigger('slideUp',[
      transition('* => *',[
        query('#slideUp' ,style({ opacity: 0, transform: 'translateY(+20px)'})),

        query('#slideUp' ,stagger('100ms',[
          animate('100ms', style({ opacity: 1, transform: 'translateY(0)'}))
        ]))
      ])
    ])
  ]
})
export class SignInComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
