import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlAPI = 'https://quizzgameapi-ji6nrrlm7q-uc.a.run.app/login'

  constructor(private httpClient: HttpClient) { }

  login(user: string, password: string) {
    return this.httpClient.post<string>(this.urlAPI, {username: user, password: password});
  }
}
