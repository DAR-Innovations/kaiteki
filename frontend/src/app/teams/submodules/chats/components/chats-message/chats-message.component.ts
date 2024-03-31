import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { ChatMessages } from '../../models/message.model'

@Component({
	selector: 'app-chats-message[currentTeamMemberId][message][prevMessage]',
	templateUrl: './chats-message.component.html',
	styleUrls: ['./chats-message.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsMessageComponent {
	@Input() currentTeamMemberId!: number
	@Input() message: ChatMessages | null = null
	@Input() prevMessage: ChatMessages | null = null

	get isCurrentUserMessage() {
		if (this.message) {
			return this.currentTeamMemberId === this.message.senderId
		}

		return false
	}

	get isMessageFromPrevAuthor() {
		if (!this.prevMessage || !this.message) {
			return false
		}

		return this.message.senderId === this.prevMessage.senderId
	}
}
