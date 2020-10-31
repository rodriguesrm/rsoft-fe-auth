import { LoginRequest } from './../../models/login-request';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = 'http://192.168.3.1:5100/api/v1.0/Auth?details=true';

  constructor(
    private httpClient: HttpClient
  ) { }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      .set('app-key', '92a4ce2a-26ed-4ae2-9813-b7e5e6a8678d')
      .set('app-access', '8f7318ee-4027-4cde-a6d3-529e6382f532')
  };

  loginUser(username: string, password: string) {
    let login = new LoginRequest(username, password);
    return this.httpClient.post(this.url, JSON.stringify(login), this.httpOptions).toPromise();
  }

}
