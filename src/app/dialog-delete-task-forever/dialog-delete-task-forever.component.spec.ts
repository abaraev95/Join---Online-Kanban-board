import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteTaskForeverComponent } from './dialog-delete-task-forever.component';

describe('DialogDeleteTaskForeverComponent', () => {
  let component: DialogDeleteTaskForeverComponent;
  let fixture: ComponentFixture<DialogDeleteTaskForeverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteTaskForeverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteTaskForeverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
