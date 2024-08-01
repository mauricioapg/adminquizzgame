import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { CategoryComponent } from './containers/category/category.component';
import { LevelComponent } from './containers/level/level.component';
import { QuestionComponent } from './containers/question/question.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'level', component: LevelComponent },
  { path: 'question', component: QuestionComponent }
  // {
  //   path: 'category', component: CategoryComponent,
  //   children: [{ path: 'new', component: CategoryFormComponent }],
  // },
  // { path: 'new', component: CategoryFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizzgameRoutingModule {}
