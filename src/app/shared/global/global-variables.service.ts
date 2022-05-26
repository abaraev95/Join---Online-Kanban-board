import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {

  public taskCompleted!: BehaviorSubject<boolean>;

  constructor() { 
    this.taskCompleted = new BehaviorSubject<boolean>(false);
  }

  getTaskCompleted(): Observable<boolean> {
    return this.taskCompleted.asObservable();
  }
  setTaskCompleted(boolValue: boolean) {
    this.taskCompleted.next(boolValue);
  }

}
