import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { MatchPeopleService } from '../services/match-people.service';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private auth : AuthenticationService,
              private matchPeople : MatchPeopleService) { }

  ngOnInit() {
    if(this.auth.userDetails){
      this.getAllMatchedPeople();
    }
  }

  getAllMatchedPeople(){
    const data = {
      userDetails : this.auth.userDetails
    }
    this.matchPeople.getAllMatchedPeople(data).subscribe(res => {
      console.log(res);
    })
  }

}
