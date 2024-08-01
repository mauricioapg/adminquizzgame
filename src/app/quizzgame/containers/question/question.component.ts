import { Component, afterNextRender } from '@angular/core';
import { Question } from '../../model/question';
import { Observable, catchError, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionService } from '../../services/question.service';
import { SuccessDialogComponent } from '../../../shared/components/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Category } from '../../model/category';
import { CategoryService } from '../../services/category.service';
import { Level } from '../../model/level';
import { LevelService } from '../../services/level.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {
  questions$: Observable<Question[]>;
  categories$: Observable<Category[]>;
  levels$: Observable<Level[]>;
  showTable$ = true;
  form: FormGroup;
  titlePage: string = 'Criar pergunta';
  idQuestion: string = '';
  title: string = '';
  category: string = '';
  level: string = '';
  alternatives: string[] = [];
  answer: string = '';
  alternativeList: string[] = [];
  listAlternativesReceive: string[] = ["Luigi","Sidney","August","José"];
  logged: Boolean = false;

  displayedColumns = ['title', 'actions'];

  constructor(
    private questionService: QuestionService,
    private categoryService: CategoryService,
    private levelService: LevelService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.questions$ = this.questionService.listAll().pipe(
      catchError((error) => {
        this.onError('Erro ao listar perguntas');
        return of([]);
      })
    );

    this.categories$ = this.categoryService.listAll();

    this.levels$ = this.levelService.listAll();

    this.form = this.formBuilder.group({
      idQuestion: [null],
      title: [null],
      category: [null],
      level: [null],
      alternatives: [null],
      answer: [null]
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
    if(this.titlePage == 'Criar pergunta'){
      if(
        this.form.value.title != '' && this.form.value.title != null &&
        this.form.value.category != '' && this.form.value.category != null &&
        this.form.value.level != '' && this.form.value.level != null &&
        this.alternativeList.length > 0 &&
        this.form.value.answer != '' && this.form.value.answer != null
      ){
        if(this.alternativeList.length < 4){
          this.onWarning('Defina 4 alternativas');
        }
        else if(!this.alternativeList.includes(this.form.value.answer)){
          this.onWarning('Nehuma alternativa encontrada com essa resposta');
        }
        else{
          this.form.value.alternatives = this.alternativeList
          this.questionService.create(this.form.value).subscribe(
          (result) => this.onSuccess(`Pergunta salva com sucesso!`),
          (error) => this.onError(`Erro ao salvar pergunta`)
        );
          this.form.reset()
        }
      }
      else{
        this.onWarning('Preencha os campos vazios');
      }
    }
    else{
        this.alternativeList = this.listAlternativesReceive
        if(this.alternativeList.length < 4){
          this.onWarning('Defina 4 alternativas');
        }
        else if(!this.alternativeList.includes(this.form.value.answer)){
          this.onWarning('Nehuma alternativa encontrada com essa resposta');
        }
        else{
          this.questionService.update(this.form.value, this.alternativeList).subscribe(
            (result) => this.onSuccess(`Pergunta editada com sucesso!`),
            (error) => this.onError(`Erro ao editar pergunta`)
          );
          this.form.reset()
        }
    }
  }

  onSuccess(msg: string) {
    this.dialog.open(SuccessDialogComponent, {
      data: msg,
    });
    this.questions$ = this.questionService.listAll()
    .pipe(
      catchError((error) => {
        this.onError('Erro ao listar perguntas');
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

  onDelete(question: Question) {
    this.questionService.delete(question.idQuestion).subscribe(
      (result) => this.onSuccess('Pergunta deletada com sucesso!'),
      (error) => this.onError('Erro ao deletar pergunta')
    );
  }

  onGetById(id: string) {
    this.questionService.getById(id)
    .subscribe(
      (result) => this.listAlternativesReceive = result,
      (error) => this.onError('Erro ao buscar pergunta por id')
    );
  }

  onChangeShow(
    edit: Boolean,
    idQuestion: string,
    title: string,
    category: string,
    level: string,
    alternatives: string[],
    answer: string,
  ) {
    this.showTable$ = !this.showTable$;

    if(edit == true){
      this.titlePage = "Editar pergunta"
      this.idQuestion = idQuestion
      this.title = title
      this.category = category
      this.level = level
      this.alternatives = alternatives
      this.answer = answer

      this.onGetById(idQuestion)
    }
    else{
      this.titlePage = "Criar pergunta"
      this.idQuestion = ''
      this.title = ''
      this.category = ''
      this.level = ''
      this.alternatives = []
      this.answer = ''
    }
  }

  getAlternativeList(list: string[]) {
    this.alternativeList = list;
  }

}
