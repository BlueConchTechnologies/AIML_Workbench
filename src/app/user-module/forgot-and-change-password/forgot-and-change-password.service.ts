import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ForgotandchangepasswordService {
  SERVER_URL = 'api/';
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');

  constructor(private httpClient: HttpClient) { }

  public getUserData() {
    return this.httpClient.get(this.SERVER_URL + 'users');
  }
}
