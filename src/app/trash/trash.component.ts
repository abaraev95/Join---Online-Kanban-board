import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteTaskForeverComponent } from '../dialog-delete-task-forever/dialog-delete-task-forever.component';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  trash: any[] = [];
  tasksAvailable = true;

  constructor(private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.firestore
      .collection('trash')
      .valueChanges({idField: 'customIdName'})
      .subscribe((changes: any) => {
        this.trash = changes;
        if(this.trash.length > 0) {
          this.tasksAvailable = true;
        } else if (this.trash.length == 0) {
          this.tasksAvailable = false;
        }
      });

  }

  restoreTask(index: number){
    this.moveAway(index);
  }

  moveAway(index: number){
    if(this.trash[index].location == 'Backlog') {
      this.moveToBacklog(index);
    } else {
      this.moveToBoard(index);
    }
    this.deleteFromTrash(index);
  }

  moveToBacklog(index: number) {
    this.trash[index].location = 'Backlog';

    this.firestore
      .collection('tasks')
      .add(JSON.parse(JSON.stringify(this.trash[index])))
  }

  moveToBoard(index: number) {
    this.trash[index].location = 'To-do';

    this.firestore
      .collection('boardTasks')
      .add(JSON.parse(JSON.stringify(this.trash[index])))
  }

  deleteFromTrash(index: number) {
    this.firestore
      .collection('trash')
      .doc(this.trash[index].customIdName)
      .delete();
  }

  openDialogDelete(index: number) {
    const dialogRef = this.dialog.open(DialogDeleteTaskForeverComponent);
    dialogRef.componentInstance.index = index;
    dialogRef.componentInstance.location = 'trash';

  }

}
