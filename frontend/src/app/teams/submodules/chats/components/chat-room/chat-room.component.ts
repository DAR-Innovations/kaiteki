import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from '../../services/chat-service.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatRoomComponent {
  @Input() includeBackButton = false;
  @Input() set chatId(id: number) {
    this.setSelectedChat(id);
  }
  @ViewChild('chatsContainer') private chatsContainer: ElementRef | undefined;

  selectedChat$: Observable<any> = this.chatService.selectedChat$;
  private selectedChatId = this.chatService.selectedChatId;

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

  constructor(private chatService: ChatService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  private setSelectedChat(id: number) {
    this.chatService.setSelectedChat(id);
  }

  private scrollToBottom(): void {
    if (this.chatsContainer) {
      this.chatsContainer.nativeElement.scrollTop =
        this.chatsContainer.nativeElement.scrollHeight;
    }
  }
}
