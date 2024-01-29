import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeamDialogComponent } from './create-team-dialog.component';

describe('CreateTeamDialogComponent', () => {
  let component: CreateTeamDialogComponent;
  let fixture: ComponentFixture<CreateTeamDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTeamDialogComponent]
    });
    fixture = TestBed.createComponent(CreateTeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
