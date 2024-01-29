import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsInvitationsComponent } from './teams-invitations.component';

describe('TeamsInvitationsComponent', () => {
  let component: TeamsInvitationsComponent;
  let fixture: ComponentFixture<TeamsInvitationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamsInvitationsComponent]
    });
    fixture = TestBed.createComponent(TeamsInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
