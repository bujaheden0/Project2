import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable()
export class Mbti16typedatailService {
  text;
  constructor(private http: HttpClient) { }

  getmbtitype(type) {
    let file : string = type + ".txt";

    return this.http.get("assets/"+file,{responseType:'text'});
  }

}
