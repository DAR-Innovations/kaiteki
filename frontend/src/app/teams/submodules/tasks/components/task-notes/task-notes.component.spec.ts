import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskNotesComponent } from './task-notes.component';

describe('TaskNotesComponent', () => {
  let component: TaskNotesComponent;
  let fixture: ComponentFixture<TaskNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskNotesComponent]
    });
    fixture = TestBed.createComponent(TaskNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
