import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
  authToken: any;
  userDetails: Object;
  userTest:Object;
  constructor(private http: Http) {
    if (this.loggedIn()) {
      this.getCurrentUser();
    }
  }

  testpic(data){
    return this.http.post('/api/test/picture', data).map(res => res.json());
  }

  register(data) {
    return this.http.post('/api/user/regis', data).map(res => res.json());
  }

  profile(data) {
    return this.http.post('/api/user/profile', data).map(res => res.json());
  }
  habit(data){
    return this.http.post('/api/user/habit', data).map(res => res.json());
  }
  testprofile(data){
    return this.http.post('/api/user/testprofile', data).map(res => res.json());
  }

  getImage(){
    return this.http.get('/api/user/image').map(res => res.json());
  }
  

  // showProfile(data) {
  //   return this.http.post('/api/user/showProfile', data).map(res => res.json());
  // }


  login(data) {
    return this.http.post('/api/user/login', data).map(res => res.json());
  }

  getFaceBookUser(data) {
    return this.http.post('/api/user/detail', data).map(res => res.json());
  }
  getSettingProfile(data){
    return this.http.post('/api/user/settingProfile', data).map(res => res.json());
  }
  getPassportFacebookCallback(){
    return this.http.get('/api/oauth/facebook/callback').map(res => res.json());
  }


  getPassportGoogleCallback(){
    return this.http.get('/api/oauth/google/callback').map(res => res.json());
  }


  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
  }




  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = "Bearer " + token;
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('/api/user/login', { headers: headers })
      .map(res => res.json());
  }

  getCurrentUser() {
    this.userDetails = JSON.parse(localStorage.getItem('user'));
    return this.userDetails;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logOut(){
    this.authToken = null;
    this.userDetails = null;
    localStorage.clear();
  }

  getDorm(){
    return this.http.get('/api/user/dorm', ).map(res => res.json());
  }
  GetDormbyDistrict(data){
    return this.http.post('/api/user/dormbydistrict', data).map(res => res.json());
  }

  getPeopleHadDorm(data){
    return this.http.post('/api/user/getPeopleHadDorm',data).map(res => res.json());
  }
  
}
