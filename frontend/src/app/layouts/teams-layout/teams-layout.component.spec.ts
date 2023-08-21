import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsLayoutComponent } from './teams-layout.component';

describe('TeamsLayoutComponent', () => {
  let component: TeamsLayoutComponent;
  let fixture: ComponentFixture<TeamsLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamsLayoutComponent]
    });
    fixture = TestBed.createComponent(TeamsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
