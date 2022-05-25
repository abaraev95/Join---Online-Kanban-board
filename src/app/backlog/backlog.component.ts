import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/models/task.class';
import { DialogDeleteBacklogTaskComponent } from '../dialog-delete-backlog-task/dialog-delete-backlog-task.component';
import { DialogOpenBacklogTaskComponent } from '../dialog-open-backlog-task/dialog-open-backlog-task.component';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {

  allTasks: any[] = [];
  tasksAvailable = true;

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
      .collection('tasks')
      .valueChanges({idField: 'customIdName'})
      .subscribe((changes: any) => {
        console.log('received changes from db:', changes);
        this.allTasks = changes;
        if(this.allTasks.length > 0) {
          this.tasksAvailable = true;
        } else if (this.allTasks.length == 0) {
          this.tasksAvailable = false;
        }
      });
  }

  openDialogDelete(index: number) {
    const dialogRef = this.dialog.open(DialogDeleteBacklogTaskComponent);
    dialogRef.componentInstance.backlogTasks = this.allTasks;  
    dialogRef.componentInstance.index = index;  
  }

  openDialogTask(index: number) {
    const dialogRef = this.dialog.open(DialogOpenBacklogTaskComponent,  { panelClass: 'view-task-class' });
    let copyTask = this.allTasks[index];
    dialogRef.componentInstance.allTasks.push(new Task(copyTask));
  }

  showAllUsers(index: number) {
    let string = '';
    let count = 0;
    this.allTasks[index].assignedTo.forEach((user: any, i: number) => {
      if(i == 0) {
        string = user.email;
      } 
      count ++;
    })
    if(count == 1) {
      return string;
    }
    else {
      return string + ' +' + (count-1);
    }
  }

  moveToBoard(task: any) {
    task.location = 'To-do';

    this.firestore
      .collection('boardTasks')
      .add(JSON.parse(JSON.stringify(task)))
      .then(() => {
        console.log('Board Task added:', task);
        this.deleteFromBacklog(task);
      })

  }

  deleteFromBacklog(task: any) {
    this.firestore
      .collection('tasks')
      .doc(task.customIdName)
      .delete()
      .then(() => {
        console.log('Task deleted from Backlog');
      })
  }

}
