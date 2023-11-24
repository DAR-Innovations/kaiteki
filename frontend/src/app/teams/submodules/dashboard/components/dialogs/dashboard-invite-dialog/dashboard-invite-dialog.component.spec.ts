import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInviteDialogComponent } from './dashboard-invite-dialog.component';

describe('DashboardInviteDialogComponent', () => {
  let component: DashboardInviteDialogComponent;
  let fixture: ComponentFixture<DashboardInviteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardInviteDialogComponent]
    });
    fixture = TestBed.createComponent(DashboardInviteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
