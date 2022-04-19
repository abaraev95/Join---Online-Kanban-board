import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteBacklogTaskComponent } from './dialog-delete-backlog-task.component';

describe('DialogDeleteBacklogTaskComponent', () => {
  let component: DialogDeleteBacklogTaskComponent;
  let fixture: ComponentFixture<DialogDeleteBacklogTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteBacklogTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteBacklogTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
