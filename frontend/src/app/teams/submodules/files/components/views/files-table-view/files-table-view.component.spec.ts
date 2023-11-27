import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesTableViewComponent } from './files-table-view.component';

describe('FilesTableViewComponent', () => {
  let component: FilesTableViewComponent;
  let fixture: ComponentFixture<FilesTableViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilesTableViewComponent]
    });
    fixture = TestBed.createComponent(FilesTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
