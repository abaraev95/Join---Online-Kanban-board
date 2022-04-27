import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogOpenBoardTaskComponent } from '../dialog-open-board-task/dialog-open-board-task.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {


  boardHeadlines = ['TO DO', 'IN PROGRESS', 'TESTING', 'DONE'];
  variables = ['toDo', 'progress', 'testing', 'done'];
  boardTasks: any[] = [];
  draggedElement: any = {};
  boardFields = document.getElementsByClassName('board-field');

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) { }

  ngOnInit(): void {

    this.firestore
      .collection('boardTasks')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.boardTasks = changes;
      })
  }

  dropElement(position: string, index: number) {
    console.log('dropped');
    console.log(this.draggedElement);


    this.draggedElement.location = position;
    this.removeHighlight(index);
    this.saveTask();
  }

  startDragging(task: any) {
    this.draggedElement = task;
  }

  allowDrop(ev: Event) {
    ev.preventDefault();
  }

  saveTask() {
    this.firestore
      .collection('boardTasks')
      .doc(this.draggedElement.customIdName)
      .update(JSON.parse(JSON.stringify(this.draggedElement)))
      .then(() => {
        console.log(this.draggedElement.title + ' has moved now to ' + this.draggedElement.location);
      })
  }

  highlight(index: number) {
    this.boardFields[index].classList.add('highlight');
  }

  removeHighlight(index: number) {
    this.boardFields[index].classList.remove('highlight');
  }

  getUserCount(task: any) {
    let count = -1;
    task.assignedTo.forEach(() => {
      count++
    })

    if (count == 0) {
      return null;
    }
    return ' +' + count;
  }

  openDialogTask(id: number) {
    this.boardTasks.forEach((task: any) => {
      if(task.customIdName == id) {
        let index = this.boardTasks.indexOf(task);
        const dialogRef = this.dialog.open(DialogOpenBoardTaskComponent);
        let copyTask = this.boardTasks[index];
        dialogRef.componentInstance.showTask = copyTask;
      }
    })
  }

}
