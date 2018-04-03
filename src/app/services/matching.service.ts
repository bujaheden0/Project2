import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MatchingService {
  constructor(private http : Http) { }
  messages : Object ;
  addInterestedPeople(data){
    return this.http.post('/api/match/add', data).map(res => res.json());
  }

  findMessage(data){
    return this.http.post('/api/notifications/find', data).map(res => res.json());
  }

  save(message){
    this.messages = message;
  }

  fetch(){
    return this.messages;
  }




}
