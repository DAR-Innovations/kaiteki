import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsSelectedDialogComponent } from './meetings-selected-dialog.component';

describe('MeetingsSelectedDialogComponent', () => {
  let component: MeetingsSelectedDialogComponent;
  let fixture: ComponentFixture<MeetingsSelectedDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingsSelectedDialogComponent]
    });
    fixture = TestBed.createComponent(MeetingsSelectedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
