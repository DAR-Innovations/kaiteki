import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsComponent } from './meetings.component';

describe('MeetingsComponent', () => {
  let component: MeetingsComponent;
  let fixture: ComponentFixture<MeetingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingsComponent]
    });
    fixture = TestBed.createComponent(MeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
