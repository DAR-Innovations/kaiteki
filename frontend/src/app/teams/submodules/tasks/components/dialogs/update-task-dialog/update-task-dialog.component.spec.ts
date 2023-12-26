import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTaskDialogComponent } from './update-task-dialog.component';

describe('UpdateTaskDialogComponent', () => {
  let component: UpdateTaskDialogComponent;
  let fixture: ComponentFixture<UpdateTaskDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTaskDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
