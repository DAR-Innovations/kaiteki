import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichEditorComponent } from './rich-editor.component';

describe('RichEditorComponent', () => {
  let component: RichEditorComponent;
  let fixture: ComponentFixture<RichEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RichEditorComponent]
    });
    fixture = TestBed.createComponent(RichEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
