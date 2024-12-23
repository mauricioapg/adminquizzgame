import { Category } from './../../model/category';
import { Component, afterNextRender } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SuccessDialogComponent } from '../../../shared/components/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  categories$: Observable<Category[]>;
  showTable$ = true;
  form: FormGroup;
  title: String = 'Criar categoria';
  idCategory: string = '';
  desc: string = '';
  logged: Boolean = false;
  base64Image: string | null = null;

  displayedColumns = ['desc', 'actions'];

  constructor(
    private service: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.categories$ = this.service.listAll().pipe(
      catchError((error) => {
        this.onError('Erro ao listar categorias');
        return of([]);
      })
    );

    this.form = this.formBuilder.group({
      idCategory: [null],
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

    const categoryData = {
      idCategory: this.form.value.idCategory,
      desc: this.form.value.desc,
      image: this.base64Image != null ? this.base64Image.includes('data:image') ? this.base64Image.split('base64,')[1] : this.base64Image : ''
    };

    if(this.title == 'Criar categoria'){
      if(this.form.value.desc != '' && this.form.value.desc != null){
        this.service.create(categoryData).subscribe(
          (result) => this.onSuccess(`Categoria ${result.desc.toUpperCase()} criada com sucesso!`),
          (error) => this.onError(`Erro ao salvar categoria ${this.form.value.desc.toUpperCase()}`)
        );
        this.form.reset()
        this.base64Image = null;
      }
      else{
        this.onWarning('Informe a descrição da categoria');
      }
    }
    else{
      if(this.form.value.desc != '' && this.form.value.desc != null){
          this.service.update(categoryData).subscribe(
            (result) => this.onSuccess(`Categoria ${this.desc.toUpperCase()} editada com sucesso!`),
            (error) => this.onError(`Erro ao editar categoria ${this.desc.toUpperCase()}`)
          );
      }
      else{
        this.onWarning('Informe a descrição da categoria');
      }
    }
  }

  onSuccess(msg: string) {
    this.dialog.open(SuccessDialogComponent, {
      data: msg
    });
    this.categories$ = this.service.listAll()
    .pipe(
      catchError((error) => {
        this.onError('Erro ao listar categorias');
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

  onDelete(category: Category) {
    this.service.delete(category.idCategory).subscribe(
      (result) => this.onSuccess(`Categoria ${category.desc.toUpperCase()} deletada com sucesso!`),
      (error) => this.onError(`Erro ao deletar categoria ${category.desc.toUpperCase()}`)
    );
  }

  onChangeShow(edit: Boolean, idCategory: string, desc: string, image: string) {
    this.showTable$ = !this.showTable$;

    if(edit == true){
      this.title = "Editar categoria"
      this.idCategory = idCategory
      this.desc = desc

      // Garantir que o prefixo de base64 seja adicionado, se não estiver presente
      if (image && !image.includes('data:image')) {
        this.base64Image = `data:image/png;base64,${image}`;
      } else {
        this.base64Image = image;
      }
    }
    else{
      this.title = "Criar categoria"
      this.idCategory = ''
      this.desc = ''
      this.base64Image = null;
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLElement;
    fileInput.click(); // Simula o clique no input file
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input?.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Arquivo selecionado:', file.name);

      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          this.base64Image = reader.result as string;
          console.log('Imagem em base64:', this.base64Image);
        }
      };

      reader.readAsDataURL(file);
    }
  }

}
