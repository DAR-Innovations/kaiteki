import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingListItemComponent } from './meeting-list-item.component';

describe('MeetingListItemComponent', () => {
  let component: MeetingListItemComponent;
  let fixture: ComponentFixture<MeetingListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingListItemComponent]
    });
    fixture = TestBed.createComponent(MeetingListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
