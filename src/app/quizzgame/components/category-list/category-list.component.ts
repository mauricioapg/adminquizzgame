import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../model/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {

  @Input() categories: Category[] = [];
  @Output() delete = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);

  readonly displayedColumns = ['desc', 'actions'];

  constructor(){}

  onDelete(category: Category) {
    this.delete.emit(category);
  }

  onEdit(category: Category) {
    this.edit.emit(category);
  }

}
