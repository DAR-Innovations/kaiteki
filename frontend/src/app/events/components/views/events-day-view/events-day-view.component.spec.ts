import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsDayViewComponent } from './events-day-view.component';

describe('EventsDayViewComponent', () => {
  let component: EventsDayViewComponent;
  let fixture: ComponentFixture<EventsDayViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventsDayViewComponent]
    });
    fixture = TestBed.createComponent(EventsDayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
