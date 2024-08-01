import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../model/question';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.scss'
})
export class QuestionListComponent {

  @Input() questions: Question[] = [];
  @Output() delete = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);

  readonly displayedColumns = ['title', 'actions'];

  constructor(){}

  onDelete(question: Question) {
    this.delete.emit(question);
  }

  onEdit(question: Question) {
    this.edit.emit(question);
  }

}
