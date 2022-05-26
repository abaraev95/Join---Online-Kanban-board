import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { formatDate } from '@angular/common'


@Component({
  selector: 'app-dialog-open-backlog-task',
  templateUrl: './dialog-open-backlog-task.component.html',
  styleUrls: ['./dialog-open-backlog-task.component.scss']
})
export class DialogOpenBacklogTaskComponent implements OnInit {

  employees: any[] = [];
  allTasks: any[] = [];
  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  changeInAssignments: any[] = [];

  editForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogOpenBacklogTaskComponent>, private firestore: AngularFirestore, private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.allTasks);

    // this.dropdownList = [
    //   { item_id: 1, item_text: 'Mumbai' },
    //   { item_id: 2, item_text: 'Bangaluru' },
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' },
    //   { item_id: 5, item_text: 'New Delhi' },
    //   { item_id: this.employees[0].id, item_text: this.employees[0].name }
    // ];
    this.initDropdownList();
    this.initSelectedItems();

    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 6,
      allowSearchFilter: false
    };

    this.changeInAssignments = JSON.parse(JSON.stringify(this.allTasks));

    this.editForm = this.fb.group({
      title: new FormControl(this.allTasks[0].title, [Validators.required]),
      dueDate: new FormControl(this.allTasks[0].dueDate, [Validators.required]),
      category: new FormControl(this.allTasks[0].category, [Validators.required]),
      urgency: new FormControl(this.allTasks[0].urgency, [Validators.required]),
      description: new FormControl(this.allTasks[0].description, [Validators.required]),
    });

    // this.editForm.controls['dueDate'].setValue(formatDate(this.allTasks[0].dueDate.seconds,'yyyy-MM-dd','en'));
    // console.log(new Date(this.allTasks[0].dueDate.seconds));

  }

  initSelectedItems() {
    this.selectedItems = [];
    for (let i = 0; i < this.allTasks[0].assignedTo.length; i++) {
      let item = { item_id: this.allTasks[0].assignedTo[i].id, item_text: this.allTasks[0].assignedTo[i].name };
      this.selectedItems.push(item);
    }
  }

  initDropdownList() {
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.employees = changes;
        this.initTest();
      });


    // for(let i = 0; i < this.allTasks[0].assignedTo.length; i++) {
    //   let item = { item_id: (i+1), item_text: this.allTasks[0].assignedTo[i].name};
    //   this.selectedItems.push(item);
    // }

  }

  initTest() {

    this.dropdownList = [
      { item_id: this.employees[0].id, item_text: this.employees[0].name }
    ];

    for (let i = 1; i < this.employees.length; i++) {
      let item = { item_id: this.employees[i].id, item_text: this.employees[i].name };
      this.dropdownList.push(item);
    }
  }

  onItemSelect(item: any) {
    console.log(this.selectedItems);
    for (const employee of this.employees) {
      if (employee.id == item.item_id) {
        this.changeInAssignments[0].assignedTo.push(employee);
        break;
      }
    }

  }
  onSelectAll(items: any) {
    console.log('all selected');
    this.changeInAssignments[0].assignedTo = [];

    for (const employee of this.employees) {
      this.changeInAssignments[0].assignedTo.push(employee)
    }

  }

  onDeSelectAll(items: any) {
    console.log('all deselected');

    this.changeInAssignments[0].assignedTo = [];
  }

  onItemDeSelect(item: any) {
    for (const [i, employee] of this.changeInAssignments[0].assignedTo.entries()) {
      if (employee.name == item.item_text) {
        this.changeInAssignments[0].assignedTo.splice(i, 1);
        break;
      }
    }
  }

  saveTask() {
    this.updateValues();
    console.log(this.editForm.getRawValue());

    this.allTasks[0].assignedTo = this.changeInAssignments[0].assignedTo;

    this.firestore
      .collection('tasks')
      .doc(this.allTasks[0].customIdName)
      .update(JSON.parse(JSON.stringify(this.allTasks[0])))
      .then(() => {
        this.dialogRef.close();
      })
  }

  updateValues() {
    this.allTasks[0].title = this.editForm.controls['title'].value;
    this.allTasks[0].dueDate = this.editForm.controls['dueDate'].value;
    this.allTasks[0].category = this.editForm.controls['category'].value;
    this.allTasks[0].urgency = this.editForm.controls['urgency'].value;
    this.allTasks[0].description = this.editForm.controls['description'].value;
  }

  moveToBoard() {
    this.allTasks[0].location = 'To-do';
    this.saveTask();

    this.firestore
      .collection('boardTasks')
      .add(JSON.parse(JSON.stringify(this.allTasks[0])))
      .then(() => {
        console.log('Board Task added:', this.allTasks[0]);
        this.deleteFromBacklog();
        this.dialogRef.close();
      })

  }

  deleteFromBacklog() {
    this.firestore
      .collection('tasks')
      .doc(this.allTasks[0].customIdName)
      .delete()
      .then(() => {
        console.log('Task deleted from Backlog');
      })
  }

  //   dateValidator(control: AbstractControl) {
  //     if (control?.value) {
  //         const today = new Date();
  //         const dateToCheck = new Date(control.value);
  //         if (dateToCheck < today) {
  //             return {'Invalid date': true}
  //         }
  //     }
  //     return null;
  // }

}
