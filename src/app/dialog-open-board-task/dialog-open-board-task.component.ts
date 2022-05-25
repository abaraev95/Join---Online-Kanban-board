import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalVariablesService } from '../shared/global/global-variables.service';

@Component({
  selector: 'app-dialog-open-board-task',
  templateUrl: './dialog-open-board-task.component.html',
  styleUrls: ['./dialog-open-board-task.component.scss']
})
export class DialogOpenBoardTaskComponent implements OnInit {

  showTask: any = {};
  id!: string;

  constructor(public dialogRef: MatDialogRef<DialogOpenBoardTaskComponent>, private firestore: AngularFirestore, public globalV: GlobalVariablesService) { }

  ngOnInit(): void {
  }

  countdown() {
    const today = new Date();
    const taskDate = new Date(this.showTask.dueDate);
    let timeLeft = taskDate.getTime() - today.getTime();
    let timeLeftInHours = Math.ceil(timeLeft / 1000 / 3600 / 24);

    if(timeLeftInHours > 1){
      return timeLeftInHours + ' Days';
    }
    if(timeLeftInHours == 1){
      return 'Tomorrow';
    }
    if(timeLeftInHours == 0){
      return 'Today';
    }
    return 'Due date already passed!';
  }

  formatDate(date: Date) {
    const taskDate = new Date(date);
    return taskDate.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  taskFinished() {
    this.deleteFromBoardTasks();
    this.globalV.setTaskCompleted(true);
    setTimeout(() => {
      this.globalV.setTaskCompleted(false);
    }, 2000);
    this.dialogRef.close();
  }

  deleteFromBoardTasks() {
    this.firestore
      .collection('boardTasks')
      .doc(this.id)
      .delete();
  }

  moveToBacklog() {
    this.showTask.location = 'backlog';
    this.firestore
      .collection('tasks')
      .add(JSON.parse(JSON.stringify(this.showTask)))
      .then(() => {
        this.deleteFromBoardTasks();
        this.dialogRef.close();
      })
  }
}
