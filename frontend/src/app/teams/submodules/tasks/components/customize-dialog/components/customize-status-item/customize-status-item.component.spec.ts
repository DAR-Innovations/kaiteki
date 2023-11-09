import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeStatusItemComponent } from './customize-status-item.component';

describe('CustomizeStatusItemComponent', () => {
  let component: CustomizeStatusItemComponent;
  let fixture: ComponentFixture<CustomizeStatusItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomizeStatusItemComponent]
    });
    fixture = TestBed.createComponent(CustomizeStatusItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
