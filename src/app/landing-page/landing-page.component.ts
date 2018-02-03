import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  animations: [
    trigger('moveUp',[
      transition('* => *',[
        query('#moveUp' ,style({ opacity: 0, transform: 'translateY(+20px)'})),

        query('#moveUp' ,stagger('200ms',[
          animate('800ms  0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)'}))
        ]))
      ])
    ])
  ]
})
export class LandingPageComponent implements OnInit {
  signup123 = "signup";
  constructor() { }

  ngOnInit() {
  }

}
