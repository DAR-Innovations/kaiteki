import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFileDialogComponent } from './upload-file-dialog.component';

describe('UploadFileDialogComponent', () => {
  let component: UploadFileDialogComponent;
  let fixture: ComponentFixture<UploadFileDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadFileDialogComponent]
    });
    fixture = TestBed.createComponent(UploadFileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
