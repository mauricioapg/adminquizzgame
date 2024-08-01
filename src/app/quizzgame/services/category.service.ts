import { HttpClient } from '@angular/common/http';
import { Injectable, afterNextRender } from '@angular/core';
import { Category } from '../model/category';
import { delay, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private urlAPI = 'https://quizzgameapi-ji6nrrlm7q-uc.a.run.app/categories'

  public headers = new Headers();

  // public headers = new Headers({
  //   'Content-Type': 'application/json',
  //   'Authorization': `Bearer ${localStorage.getItem('token')}`
  // })

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
    return this.httpClient.get<Category[]>(this.urlAPI, header)
      .pipe(
        first()
      )
  }

  create(category: Category){
    const header: Object = {headers: this.headers}
    return this.httpClient.post<Category>(this.urlAPI, category, header);
  }

  update(category: Category){
    const header: Object = {headers: this.headers}
    return this.httpClient.put(this.urlAPI + "/" + category.idCategory, category, header)
  }

  delete(id: string){
    const header: Object = {headers: this.headers}
    return this.httpClient.delete(this.urlAPI + "/" + id, header)
  }
}
