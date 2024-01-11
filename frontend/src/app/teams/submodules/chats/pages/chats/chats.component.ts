import { take } from 'rxjs';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { ChatsService } from '../../services/chats.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsComponent implements OnDestroy {
  currentChatRoom$ = this.chatsService.currentChatRoom$;

  constructor(
    private cd: ChangeDetectorRef,
    private chatsService: ChatsService
  ) {}

  ngOnDestroy(): void {
    // this.selectedChatId.next(null);
    // this.selectedChatId.complete();
  }

  onSelectChat(chatId: number) {
    // TODO: Check if current chat is already selected
    this.chatsService
      .getChatRoomById(chatId)
      .pipe(take(1))
      .subscribe((chat) => {
        this.chatsService.setCurrentChat(chat);
        this.cd.markForCheck();
      });
  }
}
