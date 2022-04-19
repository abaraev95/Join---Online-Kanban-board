import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-open-backlog-task',
  templateUrl: './dialog-open-backlog-task.component.html',
  styleUrls: ['./dialog-open-backlog-task.component.scss']
})
export class DialogOpenBacklogTaskComponent implements OnInit {

  allTasks: any[] = [];

  constructor(public dialogRef: MatDialogRef<DialogOpenBacklogTaskComponent>) { }

  ngOnInit(): void {
    console.log(this.allTasks);
    
  }

  saveTask() {

  }

}
