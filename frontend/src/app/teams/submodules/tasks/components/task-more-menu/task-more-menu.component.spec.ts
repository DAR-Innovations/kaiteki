import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskMoreMenuComponent } from './task-more-menu.component';

describe('TaskMoreMenuComponent', () => {
  let component: TaskMoreMenuComponent;
  let fixture: ComponentFixture<TaskMoreMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskMoreMenuComponent]
    });
    fixture = TestBed.createComponent(TaskMoreMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
