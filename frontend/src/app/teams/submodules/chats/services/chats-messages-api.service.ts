import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Observable } from 'rxjs'

import { CreateMessageDTO, UpdateMessageDTO } from '../models/message.dto'
import { ChatMessages } from '../models/message.model'

@Injectable({
	providedIn: 'root',
})
export class ChatsMessagesApiService {
	private readonly baseUrl: string = '/api/v1/chats'

	constructor(private httpClient: HttpClient) {}

	getHistoryMessages(chatRoomId: number) {
		return this.httpClient.get<ChatMessages[]>(`${this.baseUrl}/${chatRoomId}/messages`)
	}

	sendMessage(chatRoomId: number, dto: CreateMessageDTO): Observable<void> {
		return this.httpClient.post<void>(`${this.baseUrl}/${chatRoomId}/messages/send`, dto)
	}

	deleteMessage(teamId: number, chatRoomId: number, messageId: string): Observable<void> {
		return this.httpClient.delete<void>(
			`${this.baseUrl}/${teamId}/${chatRoomId}/messages/${messageId}`,
		)
	}

	updateMessage(
		teamId: number,
		chatRoomId: number,
		messageId: string,
		updateMessageDTO: UpdateMessageDTO,
	): Observable<void> {
		return this.httpClient.put<void>(
			`${this.baseUrl}/${teamId}/${chatRoomId}/messages/${messageId}`,
			updateMessageDTO,
		)
	}

	readAllMessages(chatRoomId: number): Observable<void> {
		return this.httpClient.post<void>(`${this.baseUrl}/${chatRoomId}/messages/read`, {})
	}
}
