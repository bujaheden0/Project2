import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class VerifyOtpService {

  constructor(private http : Http) { }

  sendOtp(data){
    return this.http.post('/api/user/verifyOtp', data).map(res => res.json());
  }

  getOtp(){
    return this.http.get('/api/user/getOtp').map(res => res.json());
  }
}
