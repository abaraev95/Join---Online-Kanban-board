import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { BacklogComponent } from './backlog/backlog.component';
import { BoardComponent } from './board/board.component';

const routes: Routes = [
  {path: 'board', component: BoardComponent},
  {path: 'backlog', component: BacklogComponent},
  {path: 'addtask', component: AddTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
