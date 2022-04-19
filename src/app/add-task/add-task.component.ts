import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray, MinValidator } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  employees = [
    {
      id: '1',
      name: 'Alexander Baraev',
      img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-mazda-mx-5-miata-mmp-1-1593459650.jpg?crop=0.781xw:0.739xh;0.109xw,0.0968xh&resize=480:*',
      email: 'abaraev@gmail.de'
    },
    {
      id: '2',
      name: 'Erika Baraev',
      img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2020-chevrolet-corvette-c8-102-1571146873.jpg?crop=0.548xw:0.411xh;0.255xw,0.321xh&resize=980:*',
      email: 'abaraev@gmail.de'
    },
    {
      id: '3',
      name: 'Dinho',
      img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-porsche-cayman-mmp-1-1593003674.jpg?crop=0.648xw:0.485xh;0.129xw,0.263xh&resize=980:*',
      email: 'abaraev@gmail.de'
    },
    {
      id: '4',
      name: 'Nala',
      img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2020-chevrolet-corvette-c8-102-1571146873.jpg?crop=0.548xw:0.411xh;0.255xw,0.321xh&resize=980:*',
      email: 'abaraev@gmail.de'
    },
    {
      id: '5',
      name: 'Peter',
      img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-porsche-cayman-mmp-1-1593003674.jpg?crop=0.648xw:0.485xh;0.129xw,0.263xh&resize=980:*',
      email: 'abaraev@gmail.de'
    }
  ];

  // testForm = new FormGroup({
  //   Name: new FormControl('', [Validators.required, Validators.email]),
  //   Designation: new FormControl('', [Validators.required, Validators.minLength(5)])
  // });

  taskForm!: FormGroup;
  date!: Date;

  constructor(private fb: FormBuilder, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      dueDate: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      urgency: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      assignedTo: this.fb.array([], [Validators.required]),
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
  submitForm() {

    let formObj = this.taskForm.getRawValue();

    this.firestore
      .collection('tasks')
      .add(formObj)
      .then(() => {
        console.log('Task added:', formObj);
        this.taskForm.reset();
      })

  }

  addUser() {
    console.log('add user');
  }


  // get name() {
  //   return this.testForm.get('Name');
  // }

  // get designation() {
  //   return this.testForm.get('Designation');
  // }

}