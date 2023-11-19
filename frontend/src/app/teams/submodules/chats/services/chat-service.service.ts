import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class ChatService {
  //TODO: Create type for chat
  private selectedChatSource = new BehaviorSubject<any>(null);
  selectedChat$: Observable<any> = this.selectedChatSource.asObservable();
  selectedChatId: number | null = null;

  private chats = [
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

  constructor() {}

  setSelectedChat(id: number) {
    const selectedChat = this.chats.find((chat) => chat.id === id) ?? null;
    this.selectedChatSource.next(selectedChat);
    this.selectedChatId = id;
  }

  getChats(): Observable<any[]> {
    return of(this.chats);
  }
}
