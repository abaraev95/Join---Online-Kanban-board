import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOpenBacklogTaskComponent } from './dialog-open-backlog-task.component';

describe('DialogOpenBacklogTaskComponent', () => {
  let component: DialogOpenBacklogTaskComponent;
  let fixture: ComponentFixture<DialogOpenBacklogTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOpenBacklogTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOpenBacklogTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
