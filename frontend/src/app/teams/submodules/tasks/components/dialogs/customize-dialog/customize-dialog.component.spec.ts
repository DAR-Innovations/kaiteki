import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeDialogComponent } from './customize-dialog.component';

describe('CustomizeDialogComponent', () => {
  let component: CustomizeDialogComponent;
  let fixture: ComponentFixture<CustomizeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomizeDialogComponent]
    });
    fixture = TestBed.createComponent(CustomizeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
