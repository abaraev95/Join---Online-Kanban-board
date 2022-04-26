import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  boardTasks: any[] = [];
  draggedElement: any = {};

  filterBoard = { location: 'board' };

  boardFields = document.getElementsByClassName('board-field');

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {

    this.firestore
      .collection('boardTasks')
      .valueChanges({idField: 'customIdName'})
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

}
