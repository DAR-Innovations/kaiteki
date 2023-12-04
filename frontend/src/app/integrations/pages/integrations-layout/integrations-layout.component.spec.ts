import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationsLayoutComponent } from './integrations-layout.component';

describe('IntegrationsLayoutComponent', () => {
  let component: IntegrationsLayoutComponent;
  let fixture: ComponentFixture<IntegrationsLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntegrationsLayoutComponent]
    });
    fixture = TestBed.createComponent(IntegrationsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
