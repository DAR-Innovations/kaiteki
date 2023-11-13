import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChatDialogComponent } from './create-chat-dialog.component';

describe('CreateChatDialogComponent', () => {
  let component: CreateChatDialogComponent;
  let fixture: ComponentFixture<CreateChatDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateChatDialogComponent]
    });
    fixture = TestBed.createComponent(CreateChatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
