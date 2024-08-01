import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizzgameRoutingModule } from './quizzgame-routing.module';
import { HomeComponent } from './containers/home/home.component';
import { CategoryComponent } from './containers/category/category.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { LevelComponent } from './containers/level/level.component';
import { QuestionComponent } from './containers/question/question.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LevelListComponent } from './components/level-list/level-list.component';
import { QuestionListComponent } from './components/question-list/question-list.component';
import { ItemPickerComponent } from './components/item-picker/item-picker.component';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    HomeComponent,
    CategoryComponent,
    CategoryListComponent,
    LevelComponent,
    QuestionComponent,
    LevelListComponent,
    QuestionListComponent,
    ItemPickerComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    QuizzgameRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class QuizzgameModule { }
