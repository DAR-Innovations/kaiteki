import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsMonthViewComponent } from './events-month-view.component';

describe('EventsMonthViewComponent', () => {
  let component: EventsMonthViewComponent;
  let fixture: ComponentFixture<EventsMonthViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventsMonthViewComponent]
    });
    fixture = TestBed.createComponent(EventsMonthViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
