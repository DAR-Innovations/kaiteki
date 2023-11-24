import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardToolbarComponent } from './dashboard-toolbar.component';

describe('DashboardToolbarComponent', () => {
  let component: DashboardToolbarComponent;
  let fixture: ComponentFixture<DashboardToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardToolbarComponent]
    });
    fixture = TestBed.createComponent(DashboardToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
