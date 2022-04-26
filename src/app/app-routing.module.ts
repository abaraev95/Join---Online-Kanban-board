import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { BacklogComponent } from './backlog/backlog.component';
import { BoardComponent } from './board/board.component';
import { TrashComponent } from './trash/trash.component';

const routes: Routes = [
  {path: 'board', component: BoardComponent},
  {path: 'backlog', component: BacklogComponent},
  {path: 'addtask', component: AddTaskComponent},
  {path: 'trash', component: TrashComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
