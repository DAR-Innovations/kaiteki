import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsComponent {
  messages = [
    {
      authorId: 2,
      authorName: 'Aida Adkenova',
      body: 'Hello Guys!!!',
      sentAt: new Date(),
    },
    {
      authorId: 1,
      authorName: 'Diar Begisbayev',
      body: 'Hello Aida, How are you doing?',
      sentAt: new Date(),
    },
    {
      authorId: 1,
      authorName: 'Diar Begisbayev',
      body: 'What the news about the agreement with new partners of firm?',
      sentAt: new Date(),
    },
    {
      authorId: 2,
      authorName: 'Aida Adkenova',
      body: 'Doing well! Partners gonna come today at 12 before lunch',
      sentAt: new Date(),
    },
    {
      authorId: 2,
      authorName: 'Aida Adkenova',
      body: 'Doing well! Partners gonna come today at 12 before lunch',
      sentAt: new Date(),
    },
  ];
}
