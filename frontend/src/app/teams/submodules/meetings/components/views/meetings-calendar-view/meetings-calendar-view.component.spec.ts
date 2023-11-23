import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsCalendarViewComponent } from './meetings-calendar-view.component';

describe('MeetingsCalendarViewComponent', () => {
  let component: MeetingsCalendarViewComponent;
  let fixture: ComponentFixture<MeetingsCalendarViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingsCalendarViewComponent]
    });
    fixture = TestBed.createComponent(MeetingsCalendarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
