import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
  authToken: any;
  userDetails: Object;
  constructor(private http: Http) {
    if (this.loggedIn()) {
      this.getCurrentUser();
    }
  }

  register(data) {
    return this.http.post('/api/user/regis', data).map(res => res.json());
  }

  profile(data) {
    return this.http.post('/api/user/profile', data).map(res => res.json());
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
    console.log(this.userDetails);
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

  
}
