import { ChatsService } from '../../services/chats.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
  currentChatRoom$ = this.chatsService.currentChatRoom$;

  constructor(
    private route: ActivatedRoute,
    private chatsService: ChatsService,
    private cd: ChangeDetectorRef
  ) {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId && !isNaN(Number(paramId))) {
      this.chatsService
        .getChatRoomById(Number(paramId))
        .pipe(take(1))
        .subscribe((chatRoom) => {
          this.chatsService.setCurrentChat(chatRoom);
          this.cd.markForCheck();
        });
    }
  }
}
