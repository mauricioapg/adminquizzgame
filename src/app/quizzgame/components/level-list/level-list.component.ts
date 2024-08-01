import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Level } from '../../model/level';

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrl: './level-list.component.scss'
})
export class LevelListComponent {

  @Input() levels: Level[] = [];
  @Output() delete = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);

  readonly displayedColumns = ['desc', 'actions'];

  constructor(){}

  onDelete(level: Level) {
    this.delete.emit(level);
  }

  onEdit(level: Level) {
    this.edit.emit(level);
  }

}
