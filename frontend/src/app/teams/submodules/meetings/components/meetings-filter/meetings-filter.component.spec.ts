import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsFilterComponent } from './meetings-filter.component';

describe('MeetingsFilterComponent', () => {
  let component: MeetingsFilterComponent;
  let fixture: ComponentFixture<MeetingsFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingsFilterComponent]
    });
    fixture = TestBed.createComponent(MeetingsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
