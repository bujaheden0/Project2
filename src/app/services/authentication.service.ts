import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
  authToken : any;
  constructor(private http : Http) { }

  register(data){
    return this.http.post('/api/user/regis', data).map(res => res.json());
  }

  profile(data){
    return this.http.post('/api/user/profile', data).map(res => res.json());
  }

  login(data){
    return this.http.post('/api/user/login', data).map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
  }

  
  loadToken() {
      const token = localStorage.getItem('id_token');
      this.authToken = token;
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('/api/user/login', {headers: headers})
      .map(res => res.json());
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

}
