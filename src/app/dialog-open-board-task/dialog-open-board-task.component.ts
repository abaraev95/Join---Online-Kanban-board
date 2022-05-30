import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GlobalVariablesService } from '../shared/global/global-variables.service';
import { formatDate } from '@angular/common'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-dialog-open-board-task',
  templateUrl: './dialog-open-board-task.component.html',
  styleUrls: ['./dialog-open-board-task.component.scss']
})
export class DialogOpenBoardTaskComponent implements OnInit {

  showTask: any = {};
  id!: string;
  
  mobileViewPortrait! :boolean;
  mobileViewLandscape! :boolean;

  constructor(
    public dialogRef: MatDialogRef<DialogOpenBoardTaskComponent>, 
    private firestore: AngularFirestore, 
    public globalV: GlobalVariablesService,
    public responsive: BreakpointObserver
    ) { }

  ngOnInit(): void {

    this.responsive.observe([
      Breakpoints.HandsetPortrait, 
      Breakpoints.HandsetLandscape])
      .subscribe(result => {
        this.mobileViewPortrait= false;
        this.mobileViewLandscape= false;

        const breakpoints = result.breakpoints;

        if (breakpoints[Breakpoints.HandsetPortrait]) {
          this.mobileViewPortrait= true;
        }
        else if (breakpoints[Breakpoints.HandsetLandscape]) {
          this.mobileViewLandscape= true;
        }

      })
  }

  countdown() {
    const today = new Date();
    const taskDate = new Date(this.showTask.dueDate);
    let timeLeft = taskDate.getTime() - today.getTime();
    let timeLeftInHours = Math.ceil(timeLeft / 1000 / 3600 / 24);

    if(timeLeftInHours > 1){
      return timeLeftInHours + ' Days';
    }
    if(timeLeftInHours == 1){
      return 'Tomorrow';
    }
    if(timeLeftInHours == 0){
      return 'Today';
    }
    return 'Due date already passed!';
  }

  formatDate(date: Date) {
    const taskDate = new Date(date);
    return taskDate.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  taskFinished() {
    const today = new Date()
    this.showTask.archiveDate = formatDate(today, 'yyyy-MM-dd', 'en');
    
    this.firestore
      .collection('archive')
      .add(JSON.parse(JSON.stringify(this.showTask)))

    this.deleteFromBoardTasks();
    this.globalV.setTaskCompleted(true);
    setTimeout(() => {
      this.globalV.setTaskCompleted(false);
    }, 2000);
    this.dialogRef.close();
  }

  deleteFromBoardTasks() {
    this.firestore
      .collection('boardTasks')
      .doc(this.id)
      .delete();
  }

  moveToBacklog() {
    this.showTask.location = 'backlog';
    this.firestore
      .collection('tasks')
      .add(JSON.parse(JSON.stringify(this.showTask)))
      .then(() => {
        this.deleteFromBoardTasks();
        this.dialogRef.close();
      })
  }

  moveToTrash() {
    const today = new Date()
    this.showTask.deleteDate = formatDate(today, 'yyyy-MM-dd', 'en')

    this.firestore
    .collection('trash')
    .add(JSON.parse(JSON.stringify(this.showTask)))
    .then(() => {
      this.deleteFromBoardTasks();
      this.dialogRef.close();
    })
  }

  moveToRight(position: string) {
    if(position == 'To-do'){
      this.showTask.location = 'Progress';
    }
    if(position == 'Progress'){
      this.showTask.location = 'Testing';
    }
    if(position == 'Testing'){
      this.showTask.location = 'Done';
    }
    this.updateTask();
  }

  moveToLeft(position: string) {

    if(position == 'Progress'){
      this.showTask.location = 'To-do';
    }
    if(position == 'Testing'){
      this.showTask.location = 'Progress';
    }
    if(position == 'Done'){
      this.showTask.location = 'Testing';
    }
    this.updateTask();
  }

  updateTask() {
    this.firestore
      .collection('boardTasks')
      .doc(this.showTask.customIdName)
      .update(JSON.parse(JSON.stringify(this.showTask)))
      .then(() => {
        this.dialogRef.close();
      })
  }

  showDestinationLeft(position: string) {

    if(position == 'Progress'){
      return 'To-do';
    }
    if(position == 'Testing'){
      return 'Progress';
    }
    if(position == 'Done'){
      return 'Testing';
    }
    return false;
  }

  showDestinationRight(position: string) {

    if(position == 'To-do'){
      return 'Progress';
    }
    if(position == 'Progress'){
      return 'Testing';
    }
    if(position == 'Testing'){
      return 'Done';
    }
    return false;
  }

}
