import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray, MinValidator, AbstractControl, FormGroupDirective, CheckboxControlValueAccessor } from '@angular/forms';
import { formatDate } from '@angular/common'


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  employees: any[] = [];

  taskForm!: FormGroup;
  date!: Date;

  taskAdded = false;

  options!: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(private fb: FormBuilder, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.createForm();

    this.options = this.fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });

    this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.employees = changes;
      });
  }

  createForm() {
    this.taskForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      dueDate: new FormControl('', [this.dateValidator, Validators.required]),
      category: new FormControl('', [Validators.required]),
      urgency: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      assignedTo: this.fb.array([], [Validators.required]),
      location: new FormControl('backlog'),
    });
  }

  onCheckboxChange(e: any, obj: any) {
    const checkArray: FormArray = this.taskForm.get('assignedTo') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(obj));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (JSON.stringify(item.value) === JSON.stringify(obj)) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;

  submitForm() {
    this.taskAdded = true;
    let date: any = this.taskForm.controls['dueDate'].value;
    this.taskForm.controls['dueDate'].setValue(formatDate(date, 'yyyy-MM-dd', 'en'));

    let formObj = this.taskForm.getRawValue();
    this.firestore
      .collection('tasks')
      .add(formObj)
      .then(() => {
        console.log('Task added:', formObj);
        this.formDirective.resetForm();
        this.taskForm.reset();
        this.uncheckAll();
      })

    setTimeout(() => {
      this.taskAdded = false;
    }, 1000);
  }

  addUser() {
    console.log('add user');
  }

  dateValidator(control: AbstractControl) {
    if (control?.value) {
      const today = new Date();
      const dateToCheck = new Date(control.value);
      if (dateToCheck < today) {
        return { 'Invalid date': true }
      }
    }
    return null;

  }

  resetForm() {
    this.taskForm.reset();
    this.uncheckAll();
  }

  uncheckAll() {
    for (let i = 0; i < this.employees.length; i++) {
      let checkbox: any = document.getElementById('myCheckbox-' + i);
      checkbox.checked = false;
    }
  }

}
