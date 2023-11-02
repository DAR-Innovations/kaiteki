import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusesCustomizeDialogComponent } from './statuses-customize-dialog.component';

describe('StatusesCustomizeDialogComponent', () => {
  let component: StatusesCustomizeDialogComponent;
  let fixture: ComponentFixture<StatusesCustomizeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusesCustomizeDialogComponent]
    });
    fixture = TestBed.createComponent(StatusesCustomizeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
