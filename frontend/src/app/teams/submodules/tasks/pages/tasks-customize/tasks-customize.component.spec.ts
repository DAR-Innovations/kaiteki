import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksCustomizeComponent } from './tasks-customize.component';

describe('TasksCustomizeComponent', () => {
  let component: TasksCustomizeComponent;
  let fixture: ComponentFixture<TasksCustomizeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasksCustomizeComponent]
    });
    fixture = TestBed.createComponent(TasksCustomizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
