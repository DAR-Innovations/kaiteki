import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateChatDialogComponent } from '../dialogs/create-chat-dialog/create-chat-dialog.component';

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

  constructor(private dialog: MatDialog) {}

  onSelectChat(chat: any) {
    if (chat) {
      this.selectedChatId.emit(chat.id);
    }
  }

  onCreateChatClick() {
    const dialogRef = this.dialog.open(CreateChatDialogComponent, {
      minWidth: '30%',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
