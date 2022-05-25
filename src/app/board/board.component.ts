import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogOpenBoardTaskComponent } from '../dialog-open-board-task/dialog-open-board-task.component';
import { GlobalVariablesService } from '../shared/global/global-variables.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {


  boardHeadlines = ['TO DO', 'IN PROGRESS', 'TESTING', 'DONE'];
  variables = ['To-do', 'Progress', 'Testing', 'Done'];
  boardTasks: any[] = [];
  draggedElement: any = {};
  boardFields = document.getElementsByClassName('board-field');
  taskCompleted!: boolean;

  constructor(public dialog: MatDialog, private firestore: AngularFirestore, public globalV: GlobalVariablesService) { }

  ngOnInit(): void {

    this.firestore
      .collection('boardTasks')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.boardTasks = changes;
      })

    this.globalV.getTaskCompleted().subscribe(result => {
      this.taskCompleted = result;
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

  openDialogTask(id: string) {
    this.boardTasks.forEach((task: any) => {
      if(task.customIdName == id) {
        let index = this.boardTasks.indexOf(task);
        const dialogRef = this.dialog.open(DialogOpenBoardTaskComponent,  { panelClass: 'view-board-task-class' });
        let copyTask = this.boardTasks[index];
        dialogRef.componentInstance.showTask = copyTask;
        dialogRef.componentInstance.id = id;
      }
    })
  }

}
