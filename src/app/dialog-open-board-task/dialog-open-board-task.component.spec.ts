import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOpenBoardTaskComponent } from './dialog-open-board-task.component';

describe('DialogOpenBoardTaskComponent', () => {
  let component: DialogOpenBoardTaskComponent;
  let fixture: ComponentFixture<DialogOpenBoardTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOpenBoardTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOpenBoardTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
