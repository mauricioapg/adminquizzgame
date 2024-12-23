import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlAPI = `${BASE_URL}/login`

  constructor(private httpClient: HttpClient) { }

  login(user: string, password: string) {
    return this.httpClient.post<string>(this.urlAPI, {username: user, password: password});
  }
}
