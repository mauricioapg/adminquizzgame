import { Component, afterNextRender } from '@angular/core';
import { Level } from '../../model/level';
import { Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { LevelService } from '../../services/level.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SuccessDialogComponent } from '../../../shared/components/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrl: './level.component.scss'
})
export class LevelComponent {
  levels$: Observable<Level[]>;
  showTable$ = true;
  form: FormGroup;
  title: String = 'Criar nível';
  idLevel: string = '';
  desc: string = '';
  logged: Boolean = false;

  displayedColumns = ['desc', 'actions'];

  constructor(
    private service: LevelService,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.levels$ = this.service.listAll().pipe(
      catchError((error) => {
        this.onError('Erro ao listar níveis');
        return of([]);
      })
    );

    this.form = this.formBuilder.group({
      idLevel: [null],
      desc: [null],
    });

    afterNextRender(() => {
      if(localStorage.getItem('token') == null){
        this.logged = false
        this.router.navigate(['']);
      }
      else{
        this.logged = true
      }
    });
   }

  onSubmit() {
    if(this.title == 'Criar nível'){
      if(this.form.value.desc != '' && this.form.value.desc != null){
        this.service.create(this.form.value).subscribe(
          (result) => this.onSuccess(`Nível ${result.desc.toUpperCase()} criado com sucesso!`),
          (error) => this.onError(`Erro ao salvar nível ${this.form.value.desc.toUpperCase()}`)
        );
        this.form.reset()
      }
      else{
        this.onWarning('Informe a descrição da níveis');
      }
    }
    else{
      if(this.form.value.desc != '' && this.form.value.desc != null){
          this.service.update(this.form.value).subscribe(
            (result) => this.onSuccess(`Nível ${this.desc.toUpperCase()} editado com sucesso!`),
            (error) => this.onError(`Erro ao editar nível ${this.desc.toUpperCase()}`)
          );
      }
      else{
        this.onWarning('Informe a descrição da níveis');
      }
    }
  }

  onSuccess(msg: string) {
    this.dialog.open(SuccessDialogComponent, {
      data: msg,
    });
    this.levels$ = this.service.listAll()
    .pipe(
      catchError((error) => {
        this.onError('Erro ao listar níveis');
        return of([]);
      })
    );
  }

  onWarning(msg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: msg,
    });
  }

  onError(msg: string) {
    this.snackBar.open(msg, 'Fechar', { duration: 5000 });
  }

  onDelete(level: Level) {
    this.service.delete(level.idLevel).subscribe(
      (result) => this.onSuccess(`Nível ${level.desc.toUpperCase()} deletado com sucesso!`),
      (error) => this.onError(`Erro ao deletar nível ${level.desc.toUpperCase()}`)
    );
  }

  onChangeShow(edit: Boolean, idLevel: string, desc: string) {
    this.showTable$ = !this.showTable$;

    if(edit == true){
      this.title = "Editar nível"
      this.idLevel = idLevel
      this.desc = desc
    }
    else{
      this.title = "Criar nível"
      this.idLevel = ''
      this.desc = ''
    }
  }

}
