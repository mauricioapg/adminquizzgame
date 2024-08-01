import { Injectable, afterNextRender } from '@angular/core';
import { Question } from '../model/question';
import { HttpClient } from '@angular/common/http';
import { delay, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private urlAPI = 'https://quizzgameapi-ji6nrrlm7q-uc.a.run.app/questions'

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
    return this.httpClient.get<Question[]>(this.urlAPI, header)
      .pipe(
        first()
      )
  }

  getById(id: string){
    const header: Object = {headers: this.headers}
    return this.httpClient.get<string[]>(this.urlAPI + "/" + 'id-question/' + id, header);
  }

  create(question: Question){
    const header: Object = {headers: this.headers}
    return this.httpClient.post<Question>(this.urlAPI, question, header);
  }

  update(question: Question, alternativeList: string[]){
    const header: Object = {headers: this.headers}
    question.alternatives = alternativeList
    return this.httpClient.put(this.urlAPI + "/" + question.idQuestion, question, header);
  }

  delete(id: string){
    const header: Object = {headers: this.headers}
    return this.httpClient.delete(this.urlAPI + "/" + id, header)
  }
}
