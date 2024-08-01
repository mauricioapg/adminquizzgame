import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// export interface Tile {
//   id: string;
//   name: string;
// }

@Component({
  selector: 'app-item-picker',
  templateUrl: './item-picker.component.html',
  styleUrl: './item-picker.component.scss'
})
export class ItemPickerComponent {

  @Input() edit: Boolean = false;
  @Input() list: string[] = [];
  @Output() alternativeList = new EventEmitter<string[]>();

  alternatives: string[] = [];
  name: string = '';

  constructor(private snackBar: MatSnackBar){}

  ngOnInit() { }

  add(){
    if(this.name != ''){
      if(this.list.length > 0){
        this.alternatives = this.list
      }

      if(this.alternatives.length < 4){
        this.alternatives.push(this.name)
        this.name = ''
        this.alternativeList.emit(this.alternatives);
      }
      else{
        this.onError(`Limite de alternativas excedido`)
      }
    }
  }

  close(name: string){
    if(this.edit){
      this.alternatives = this.list
    }
    this.alternatives.splice(this.alternatives.indexOf(name), 1)
  }

  onError(msg: string) {
    this.snackBar.open(msg, 'Fechar', { duration: 5000 });
  }

}
