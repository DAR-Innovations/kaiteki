import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupDialogComponent } from '../dialogs/create-group-dialog/create-group-dialog.component';
import { CreateSingleDialogComponent } from '../dialogs/create-single-dialog/create-single-dialog.component';

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

  onCreateGroupClick() {
    const dialogRef = this.dialog.open(CreateGroupDialogComponent, {
      minWidth: '30%',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  onCreateSingleClick() {
    const dialogRef = this.dialog.open(CreateSingleDialogComponent, {
      minWidth: '30%',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
