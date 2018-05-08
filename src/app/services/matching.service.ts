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

  getInterestedPeople(data){
    return this.http.post('/api/match/getInfo', data).map(res => res.json());
  }

  setReadStatus(data){
    return this.http.post('/api/notifications/update', data).map(res => res.json());
  }

  updateMatchingStatus_agree(data){
    return this.http.post('/api/match/agree',data).map(res => res.json());
  }

  updateMatchingStatus_reject(data){
    return this.http.post('/api/match/reject',data).map(res => res.json());
  }

  findMatchedPeopleInfo(data){
    return this.http.post('/api/match/find',data).map(res => res.json());
  }

  check_ifIsMatching(data){
    return this.http.post('/api/match/check', data).map(res => res.json());
  }

  updateUserStatus_Matched(data){
    return this.http.post('/api/match/setUserStatus',data).map(res => res.json());
  }

  getRoommate(data){
    return this.http.post('/api/match/getRoommate',data).map(res => res.json());
  }

  getRoommateInfo(data){
    return this.http.post('/api/match/getRoommateInfo',data).map(res => res.json());
  }


}
