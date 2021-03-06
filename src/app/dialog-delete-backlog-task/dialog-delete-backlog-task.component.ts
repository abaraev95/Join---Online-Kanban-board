import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-backlog-task',
  templateUrl: './dialog-delete-backlog-task.component.html',
  styleUrls: ['./dialog-delete-backlog-task.component.scss']
})
export class DialogDeleteBacklogTaskComponent implements OnInit {

  backlogTasks: any[] = [];
  index!: number;

  constructor(public dialogRef: MatDialogRef<DialogDeleteBacklogTaskComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  deleteFromBacklog() {
    this.firestore
      .collection('tasks')
      .doc(this.backlogTasks[this.index].customIdName)
      .delete();
  }

  moveToTrash() {
    const today = new Date()
    this.backlogTasks[this.index].deleteDate = formatDate(today, 'yyyy-MM-dd', 'en')

    this.firestore
      .collection('trash')
      .add(JSON.parse(JSON.stringify(this.backlogTasks[this.index])))
      .then(() => {
        this.deleteFromBacklog();
        this.dialogRef.close();
      })
  }

}
