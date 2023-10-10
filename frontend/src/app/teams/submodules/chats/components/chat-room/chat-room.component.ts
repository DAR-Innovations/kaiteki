import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatRoomComponent {
  @Input() includeBackButton = false;
  @Input() chatId: number | null = null;
  @ViewChild('chatsContainer') private chatsContainer: ElementRef | undefined;

  selectedChat$: Observable<any> = of(null);

  ngOnInit() {
    this.loadSelectedChat();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private loadSelectedChat() {
    const chats = [
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
    if (this.chatId) {
      this.selectedChat$ = of(chats.find((c) => c.id === this.chatId) ?? null);
    }
  }

  private scrollToBottom(): void {
    if (this.chatsContainer) {
      this.chatsContainer.nativeElement.scrollTop =
        this.chatsContainer.nativeElement.scrollHeight;
    }
  }

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
