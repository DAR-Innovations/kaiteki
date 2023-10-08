import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingRoomComponent } from './meeting-room.component';

describe('MeetingRoomComponent', () => {
  let component: MeetingRoomComponent;
  let fixture: ComponentFixture<MeetingRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingRoomComponent]
    });
    fixture = TestBed.createComponent(MeetingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
