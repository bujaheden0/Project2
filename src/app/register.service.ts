import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RegisterService {

  constructor(private http:Http) { }

  register(data){
    return this.http.post('/api/user', data).map(res => res.json().success);
  }

}
