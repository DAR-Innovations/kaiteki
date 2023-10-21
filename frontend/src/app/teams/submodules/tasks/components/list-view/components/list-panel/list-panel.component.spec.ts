import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPanelComponent } from './list-panel.component';

describe('ListPanelComponent', () => {
  let component: ListPanelComponent;
  let fixture: ComponentFixture<ListPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPanelComponent]
    });
    fixture = TestBed.createComponent(ListPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
