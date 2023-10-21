import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksToolbarComponent } from './tasks-toolbar.component';

describe('TasksFilterComponent', () => {
  let component: TasksToolbarComponent;
  let fixture: ComponentFixture<TasksToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasksToolbarComponent],
    });
    fixture = TestBed.createComponent(TasksToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
