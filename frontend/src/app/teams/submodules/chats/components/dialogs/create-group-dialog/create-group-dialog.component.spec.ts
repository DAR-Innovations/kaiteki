import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroupDialogComponent } from './create-group-dialog.component';

describe('CreateGroupDialogComponent', () => {
  let component: CreateGroupDialogComponent;
  let fixture: ComponentFixture<CreateGroupDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateGroupDialogComponent]
    });
    fixture = TestBed.createComponent(CreateGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
