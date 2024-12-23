import { HttpClient } from '@angular/common/http';
import { Injectable, afterNextRender } from '@angular/core';
import { Level } from '../model/level';
import { delay, first, Observable } from 'rxjs';
import { BASE_URL } from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  private urlAPI = `${BASE_URL}/levels`

  public headers = new Headers()

  constructor(private httpClient: HttpClient) {

    afterNextRender(() => {
      this.headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    });

  }

  listAll() {
    const header: Object = {headers: this.headers}
    return this.httpClient.get<Level[]>(this.urlAPI, header)
      .pipe(
        first()
      )
  }

  create(category: Level){
    const header: Object = {headers: this.headers}
    return this.httpClient.post<Level>(this.urlAPI, category, header);
  }

  update(level: Level){
    const header: Object = {headers: this.headers}
    return this.httpClient.put(this.urlAPI + "/" + level.idLevel, level, header)
  }

  delete(id: string){
    const header: Object = {headers: this.headers}
    return this.httpClient.delete(this.urlAPI + "/" + id, header)
  }
}
