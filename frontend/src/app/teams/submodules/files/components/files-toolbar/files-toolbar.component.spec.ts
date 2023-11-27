import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesToolbarComponent } from './files-toolbar.component';

describe('FilesToolbarComponent', () => {
  let component: FilesToolbarComponent;
  let fixture: ComponentFixture<FilesToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilesToolbarComponent]
    });
    fixture = TestBed.createComponent(FilesToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
