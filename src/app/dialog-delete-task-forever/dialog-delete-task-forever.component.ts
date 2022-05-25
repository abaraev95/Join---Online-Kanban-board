import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-task-forever',
  templateUrl: './dialog-delete-task-forever.component.html',
  styleUrls: ['./dialog-delete-task-forever.component.scss']
})
export class DialogDeleteTaskForeverComponent implements OnInit {

  index!: number;
  location = '';
  trash: any[] = [];
  archive: any[] = [];
  constructor(public dialogRef: MatDialogRef<DialogDeleteTaskForeverComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore
      .collection('trash')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.trash = changes;
      });

    this.firestore
      .collection('archive')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.archive = changes;
      });
  }

  deleteForever() {
    if (this.location == 'trash') {
      this.firestore
        .collection('trash')
        .doc(this.trash[this.index].customIdName)
        .delete()
        .then(() => {
          this.dialogRef.close();
        })
    } else if (this.location == 'archive') {
      this.firestore
        .collection('archive')
        .doc(this.archive[this.index].customIdName)
        .delete()
        .then(() => {
          this.dialogRef.close();
        })
    }

  }

}
