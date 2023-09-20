import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksFilterComponent } from './tasks-filter.component';

describe('TasksFilterComponent', () => {
  let component: TasksFilterComponent;
  let fixture: ComponentFixture<TasksFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasksFilterComponent]
    });
    fixture = TestBed.createComponent(TasksFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
