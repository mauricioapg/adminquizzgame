import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessDialogComponent } from './components/success-dialog/success-dialog.component'
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component'
import { AppMaterialModule } from './app-material/app-material.module';


@NgModule({
  declarations: [
    SuccessDialogComponent,
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [ErrorDialogComponent]
})
export class SharedModule { }
