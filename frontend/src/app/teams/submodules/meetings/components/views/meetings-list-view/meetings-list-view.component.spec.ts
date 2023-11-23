import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsListViewComponent } from './meetings-list-view.component';

describe('MeetingsListViewComponent', () => {
  let component: MeetingsListViewComponent;
  let fixture: ComponentFixture<MeetingsListViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingsListViewComponent]
    });
    fixture = TestBed.createComponent(MeetingsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
