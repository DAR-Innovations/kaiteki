import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSingleDialogComponent } from './create-single-dialog.component';

describe('CreateSingleDialogComponent', () => {
  let component: CreateSingleDialogComponent;
  let fixture: ComponentFixture<CreateSingleDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSingleDialogComponent]
    });
    fixture = TestBed.createComponent(CreateSingleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
