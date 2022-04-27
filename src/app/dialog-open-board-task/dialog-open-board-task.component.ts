import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-open-board-task',
  templateUrl: './dialog-open-board-task.component.html',
  styleUrls: ['./dialog-open-board-task.component.scss']
})
export class DialogOpenBoardTaskComponent implements OnInit {

  showTask: any = {};

  constructor(public dialogRef: MatDialogRef<DialogOpenBoardTaskComponent>, private firestore: AngularFirestore) { }

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
    if(timeLeftInHours > 1){
      return 'Tomorrow';
    }
    if(timeLeftInHours == 0){
      return 'Today';
    }
    return 'Due date already passed!';
  }

}
