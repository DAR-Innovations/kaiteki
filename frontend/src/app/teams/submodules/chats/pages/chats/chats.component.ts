import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core'

import { take } from 'rxjs'

import { ChatsService } from '../../services/chats.service'

@Component({
	selector: 'app-chats',
	templateUrl: './chats.component.html',
	styleUrls: ['./chats.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsComponent {
	currentChatRoom$ = this.chatsService.currentChatRoom$

	constructor(
		private cd: ChangeDetectorRef,
		private chatsService: ChatsService,
	) {}

	onSelectChat(chatId: number) {
		this.chatsService
			.getChatRoomById(chatId)
			.pipe(take(1))
			.subscribe(chat => {
				this.chatsService.setCurrentChat(chat)
				this.cd.markForCheck()
			})
	}
}
