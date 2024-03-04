import { Injectable } from '@angular/core'

import { map } from 'rxjs'

import { RxStompService } from 'src/app/shared/services/rx-stomp.service'

import { CreateMessageDTO } from '../models/message.dto'
import { ChatMessages } from '../models/message.model'

@Injectable({
	providedIn: 'root',
})
export class ChatsMessagesService {
	constructor(private rxStompService: RxStompService) {}

	sendMessage(chatRoomId: number, dto: CreateMessageDTO) {
		this.rxStompService.publish({
			destination: `/app/chat/${chatRoomId}/message/send`,
			body: JSON.stringify(dto),
		})
	}

	recieveMessages(chatRoomId: number) {
		return this.rxStompService.watch(`/queue/chat/${chatRoomId}/messages`).pipe(
			map(response => {
				const data = JSON.parse(response.body) as unknown
				if (this.isChatMessageType(data)) {
					return data
				}

				return null
			})
		)
	}

	private isChatMessageType(object: any): object is ChatMessages {
		if (
			'id' in object &&
			'content' in object &&
			'status' in object &&
			'messageType' in object &&
			'eventType' in object &&
			'sentDate' in object
		) {
			return true
		}

		return false
	}
}
