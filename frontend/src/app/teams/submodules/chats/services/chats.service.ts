import { Injectable } from '@angular/core'

import {
	BehaviorSubject,
	EMPTY,
	Subject,
	combineLatest,
	switchMap,
	throwError,
} from 'rxjs'

import { TeamsService } from 'src/app/teams/services/teams.service'

import {
	ChatRoomsFilter,
	CreateChatRoomDTO,
	UpdateChatRoomDTO,
} from '../models/chat-rooms.dto'
import { ChatRooms } from '../models/chat-rooms.model'
import { CreateMessageDTO, UpdateMessageDTO } from '../models/message.dto'

import { ChatsApiService } from './chats-api.service'
import { ChatsMessagesService } from './chats-messages.service'

@Injectable({
	providedIn: 'root',
})
export class ChatsService {
	private refetchChatsSubject = new Subject<void>()
	private currentChatRoomSubject = new BehaviorSubject<ChatRooms | null>(null)

	refetchChats$ = this.refetchChatsSubject.asObservable()
	currentChatRoom$ = this.currentChatRoomSubject.asObservable()

	constructor(
		private teamsService: TeamsService,
		private chatsApiService: ChatsApiService,
		private chatsMessagesService: ChatsMessagesService
	) {}

	setCurrentChat(chatRoom: ChatRooms | null) {
		this.currentChatRoomSubject.next(chatRoom)
	}

	getChatRooms(filter: ChatRoomsFilter) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.chatsApiService.getChatRooms(team.id, filter)
				}

				return throwError(() => Error('No current team'))
			})
		)
	}

	getChatRoomById(chartRoomId: number) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.chatsApiService.getChatRoomById(team.id, chartRoomId)
				}

				return throwError(() => Error('No current team'))
			})
		)
	}

	createChatRoom(dto: CreateChatRoomDTO) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.chatsApiService.createChatRoom(team.id, dto)
				}

				return throwError(() => Error('No current team'))
			})
		)
	}

	updateChatRoom(chatRoomId: number, dto: UpdateChatRoomDTO) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.chatsApiService.updateChatRoom(team.id, chatRoomId, dto)
				}

				return throwError(() => Error('No current team'))
			})
		)
	}

	deleteChatRoom(chatRoomId: number) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.chatsApiService.deleteChatRoom(team.id, chatRoomId)
				}

				return throwError(() => Error('No current team'))
			})
		)
	}

	getHistoryMessages() {
		return this.currentChatRoom$.pipe(
			switchMap(chat => {
				if (chat) {
					return this.chatsApiService.getHistoryMessages(chat.id)
				}

				return throwError(() => Error('No current chat room'))
			})
		)
	}

	subscribeRealTimeChatMessages() {
		return this.currentChatRoom$.pipe(
			switchMap(chat => {
				if (chat) {
					return this.chatsMessagesService.receiveMessages(chat.id)
				}

				return throwError(() => Error('No current chat room'))
			})
		)
	}

	sendMessageByCurrentChat(dto: CreateMessageDTO) {
		return this.currentChatRoom$.pipe(
			switchMap(chat => {
				if (chat) {
					this.chatsMessagesService.sendMessage(chat.id, dto)
					return EMPTY
				}

				return throwError(() => Error('No current chat room'))
			})
		)
	}

	updateMessage(messageId: string, dto: UpdateMessageDTO) {
		return combineLatest([
			this.teamsService.currentTeam$,
			this.currentChatRoom$,
		]).pipe(
			switchMap(([team, chat]) => {
				if (chat && team) {
					this.chatsApiService.updateMessage(team.id, chat.id, messageId, dto)
					return EMPTY
				}

				return throwError(() => Error('No current chat room or team'))
			})
		)
	}

	deleteMessage(messageId: string) {
		return combineLatest([
			this.teamsService.currentTeam$,
			this.currentChatRoom$,
		]).pipe(
			switchMap(([team, chat]) => {
				if (chat && team) {
					this.chatsApiService.deleteMessage(team.id, chat.id, messageId)
					return EMPTY
				}

				return throwError(() => Error('No current chat room or team'))
			})
		)
	}

	readAllMessages() {
		return this.currentChatRoom$.pipe(
			switchMap(chat => {
				if (chat) {
					this.chatsApiService.readAllMessages(chat.id)
					return EMPTY
				}

				return throwError(() => Error('No current chat room'))
			})
		)
	}

	refetchChats() {
		this.refetchChatsSubject.next()
	}
}
