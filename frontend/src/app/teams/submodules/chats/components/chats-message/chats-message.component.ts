import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-chats-message',
  templateUrl: './chats-message.component.html',
  styleUrls: ['./chats-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsMessageComponent {
  currentUserId = 1;
  @Input() message: any;
  @Input() prevMessage: any;

  get isCurrentUserMessage() {
    console.log(this.currentUserId === this.message.authorId);
    return this.currentUserId === this.message.authorId;
  }

  get isMessageFromPrevAuthor() {
    if (this.prevMessage === undefined) {
      return false;
    }

    return this.message.authorId === this.prevMessage.authorId;
  }
}
