import { LoginRequest } from './../../models/login-request';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    .set('app-key', environment.appKey)
    .set('app-access', environment.appAccess)
  };

  loginUser(username: string, password: string) : Promise<Object> {
    let login = new LoginRequest(username, password);
    const action = 'api/v1.0/Auth?details=true';
    return this.httpClient.post(this.url + action, JSON.stringify(login), this.httpOptions).toPromise();
  }

}
