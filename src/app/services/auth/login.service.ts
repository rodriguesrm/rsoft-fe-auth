import { LoginRequest } from './../../models/login-request';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = 'http://192.168.3.1:5100/api/v1.0/Auth';

  constructor(
    private httpClient: HttpClient
  ) { }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      .set('app-key', '92a4ce2a-26ed-4ae2-9813-b7e5e6a8678d')
      .set('app-access', '8f7318ee-4027-4cde-a6d3-529e6382f532')
  };

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client error
      errorMessage = error.error.message;
    } else {
      // Server error
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

  loginUser(username: string, password: string): Observable<any> {
    let login = new LoginRequest(username, password);
    return this.httpClient.post<LoginRequest>(this.url, JSON.stringify(login), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

}
