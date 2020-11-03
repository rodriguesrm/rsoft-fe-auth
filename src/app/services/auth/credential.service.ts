import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CredentialRequest } from 'src/app/models/credential-request';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  private url: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      .set('app-key', environment.appKey)
      .set('app-access', environment.appAccess)
  };

  saveCredential(token: string, password: string, firstAccess: boolean): Promise<Object> {
    let credential = new CredentialRequest(token, password);
    if (firstAccess)
      return this.httpClient.post(this.url + "api/v1.0/credential/first", JSON.stringify(credential), this.httpOptions).toPromise();
    else
      return this.httpClient.put(this.url + "api/v1.0/credential/recovery", JSON.stringify(credential), this.httpOptions).toPromise();
  }

}
