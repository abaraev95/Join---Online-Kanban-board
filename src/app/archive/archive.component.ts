import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteTaskForeverComponent } from '../dialog-delete-task-forever/dialog-delete-task-forever.component';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  archive: any[] = [];
  tasksAvailable = true;

  constructor(private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.firestore
      .collection('archive')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.archive = changes;
        if (this.archive.length > 0) {
          this.tasksAvailable = true;
        } else if (this.archive.length == 0) {
          this.tasksAvailable = false;
        }
      });

  }

  restoreTask(index: number) {
    this.moveAway(index);
  }

  moveAway(index: number) {
    this.moveToBoard(index);
    this.deleteFromArchive(index);
  }

  moveToBoard(index: number) {
    this.archive[index].location = 'Done';

    this.firestore
      .collection('boardTasks')
      .add(JSON.parse(JSON.stringify(this.archive[index])))
  }

  deleteFromArchive(index: number) {
    this.firestore
      .collection('archive')
      .doc(this.archive[index].customIdName)
      .delete();
  }

  openDialogDelete(index: number) {
    const dialogRef = this.dialog.open(DialogDeleteTaskForeverComponent);
    dialogRef.componentInstance.index = index;
    dialogRef.componentInstance.location = 'archive';
  }

}