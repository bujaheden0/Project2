import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class MatchPeopleService {

  constructor(private http : Http) { }

  getAllMatchedPeople(data){
    return this.http.post('/api/user/match', data).map(res => res.json());
  }

  postMatchPeopleforQueries_user_hadDorm(data){
    return this.http.post('/api/user/match/dorm', data).map(res => res.json());
  }

}
