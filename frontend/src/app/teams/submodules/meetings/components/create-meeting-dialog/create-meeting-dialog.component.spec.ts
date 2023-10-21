import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMeetingDialogComponent } from './create-meeting-dialog.component';

describe('CreateMeetingDialogComponent', () => {
  let component: CreateMeetingDialogComponent;
  let fixture: ComponentFixture<CreateMeetingDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMeetingDialogComponent]
    });
    fixture = TestBed.createComponent(CreateMeetingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
