import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-backlog-task',
  templateUrl: './dialog-delete-backlog-task.component.html',
  styleUrls: ['./dialog-delete-backlog-task.component.scss']
})
export class DialogDeleteBacklogTaskComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDeleteBacklogTaskComponent>) { }

  ngOnInit(): void {
  }

  onNoClick() {

  }

  deleteFromBacklog() {

  }

}
