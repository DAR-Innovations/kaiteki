import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chats-sidebar',
  templateUrl: './chats-sidebar.component.html',
  styleUrls: ['./chats-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsSidebarComponent {
  searchForm = new FormGroup({
    value: new FormControl(null),
  });

  chats = [
    {
      label: 'Monopolist',
      icon: 'link',
      lastMessage: {
        author: 'Aliya',
        sentAt: new Date(),
        body: 'Hello Guys!!!',
      },
    },
    {
      label: 'Kaiteki Project',
      icon: 'link',
      lastMessage: {
        author: 'Ramazan',
        sentAt: new Date(),
        body: 'Lets Strat our journey with it',
      },
    },
    {
      label: 'University Research Group',
      icon: 'link',
      lastMessage: {
        author: 'Yeldat',
        sentAt: new Date(),
        body: 'Attention! We are glad to announce you the initial research group',
      },
    },
    {
      label: 'Monopolist',
      icon: 'link',
      lastMessage: {
        author: 'Aliya',
        sentAt: new Date(),
        body: 'Hello Guys!!!',
      },
    },
    {
      label: 'Kaiteki Project',
      icon: 'link',
      lastMessage: {
        author: 'Ramazan',
        sentAt: new Date(),
        body: 'Lets Strat our journey with it',
      },
    },
    {
      label: 'University Research Group',
      icon: 'link',
      lastMessage: {
        author: 'Yeldat',
        sentAt: new Date(),
        body: 'Attention! We are glad to announce you the initial research group',
      },
    },
    {
      label: 'Monopolist',
      icon: 'link',
      lastMessage: {
        author: 'Aliya',
        sentAt: new Date(),
        body: 'Hello Guys!!!',
      },
    },
    {
      label: 'Kaiteki Project',
      icon: 'link',
      lastMessage: {
        author: 'Ramazan',
        sentAt: new Date(),
        body: 'Lets Strat our journey with it',
      },
    },
    {
      label: 'University Research Group',
      icon: 'link',
      lastMessage: {
        author: 'Yeldat',
        sentAt: new Date(),
        body: 'Attention! We are glad to announce you the initial research group',
      },
    },
    {
      label: 'Monopolist',
      icon: 'link',
      lastMessage: {
        author: 'Aliya',
        sentAt: new Date(),
        body: 'Hello Guys!!!',
      },
    },
    {
      label: 'Kaiteki Project',
      icon: 'link',
      lastMessage: {
        author: 'Ramazan',
        sentAt: new Date(),
        body: 'Lets Strat our journey with it',
      },
    },
    {
      label: 'University Research Group',
      icon: 'link',
      lastMessage: {
        author: 'Yeldat',
        sentAt: new Date(),
        body: 'Attention! We are glad to announce you the initial research group',
      },
    },
    {
      label: 'Monopolist',
      icon: 'link',
      lastMessage: {
        author: 'Aliya',
        sentAt: new Date(),
        body: 'Hello Guys!!!',
      },
    },
    {
      label: 'Kaiteki Project',
      icon: 'link',
      lastMessage: {
        author: 'Ramazan',
        sentAt: new Date(),
        body: 'Lets Strat our journey with it',
      },
    },
    {
      label: 'University Research Group',
      icon: 'link',
      lastMessage: {
        author: 'Yeldat',
        sentAt: new Date(),
        body: 'Attention! We are glad to announce you the initial research group',
      },
    },
  ];
}
