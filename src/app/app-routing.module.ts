import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { BacklogComponent } from './backlog/backlog.component';
import { BoardComponent } from './board/board.component';
import { PrivacyNoticeComponent } from './privacy-notice/privacy-notice.component';
import { TrashComponent } from './trash/trash.component';


const routes: Routes = [
  {path: '',  redirectTo: '/board', pathMatch: 'full'},
  {path: 'board', component: BoardComponent},
  {path: 'backlog', component: BacklogComponent},
  {path: 'addtask', component: AddTaskComponent},
  {path: 'trash', component: TrashComponent},
  {path: 'privacy', component: PrivacyNoticeComponent},
  {path: 'about', component: AboutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
