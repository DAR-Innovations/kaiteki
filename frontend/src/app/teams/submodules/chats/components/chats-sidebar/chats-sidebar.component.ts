import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chats-sidebar',
  templateUrl: './chats-sidebar.component.html',
  styleUrls: ['./chats-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsSidebarComponent {
  @Output() selectedChatId = new EventEmitter<number>();

  searchForm = new FormGroup({
    value: new FormControl(null),
  });

  chats = [
    {
      id: 1,
      label: 'Monopolist',
      icon: 'link',
      lastMessage: {
        author: 'Aliya',
        sentAt: new Date(),
        body: 'Hello Guys!!!',
      },
    },
    {
      id: 2,
      label: 'Ankara Club',
      icon: 'link',
      lastMessage: {
        author: 'Aliya',
        sentAt: new Date(),
        body: 'Hello Guys!!!',
      },
    },
  ];

  constructor(private cd: ChangeDetectorRef) {}

  onSelectChat(chat: any) {
    if (chat) {
      this.selectedChatId.emit(chat.id);
      this.cd.markForCheck();
    }
  }
}
