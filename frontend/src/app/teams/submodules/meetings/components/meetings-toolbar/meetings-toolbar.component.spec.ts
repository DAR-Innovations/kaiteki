import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsToolbarComponent } from './meetings-toolbar.component';

describe('MeetingsToolbarComponent', () => {
  let component: MeetingsToolbarComponent;
  let fixture: ComponentFixture<MeetingsToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingsToolbarComponent]
    });
    fixture = TestBed.createComponent(MeetingsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
