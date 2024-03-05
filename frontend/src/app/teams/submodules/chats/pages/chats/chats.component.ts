import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
} from '@angular/core'

import { Subject, take } from 'rxjs'

import { ChatsService } from '../../services/chats.service'

@Component({
	selector: 'app-chats',
	templateUrl: './chats.component.html',
	styleUrls: ['./chats.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsComponent implements OnDestroy {
	private destroy$ = new Subject<void>()
	currentChatRoom$ = this.chatsService.currentChatRoom$

	constructor(
		private cd: ChangeDetectorRef,
		private chatsService: ChatsService
	) {}

	ngOnDestroy(): void {
		this.destroy$.next()
		this.destroy$.complete()
	}

	onSelectChat(chatId: number) {
		// TODO: Check if current chat is already selected
		this.chatsService
			.getChatRoomById(chatId)
			.pipe(take(1))
			.subscribe(chat => {
				this.chatsService.setCurrentChat(chat)
				this.cd.markForCheck()
			})
	}
}
