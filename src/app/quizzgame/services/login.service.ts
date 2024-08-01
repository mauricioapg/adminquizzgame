import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlAPI = 'http://localhost:8080/login'

  constructor(private httpClient: HttpClient) { }

  login(user: string, password: string) {
    return this.httpClient.post<string>(this.urlAPI, {username: user, password: password});
  }
}
