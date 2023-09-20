import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsMessageComponent } from './chats-message.component';

describe('ChatsMessageComponent', () => {
  let component: ChatsMessageComponent;
  let fixture: ComponentFixture<ChatsMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatsMessageComponent]
    });
    fixture = TestBed.createComponent(ChatsMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
