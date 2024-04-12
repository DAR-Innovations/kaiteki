import { Injectable } from '@angular/core'

import { BehaviorSubject, Subject, combineLatest, map, switchMap, throwError } from 'rxjs'

import { RxStompService } from 'src/app/shared/services/rx-stomp.service'

import { TeamsService } from 'src/app/teams/services/teams.service'

import { ChatRoomsFilter, CreateChatRoomDTO, UpdateChatRoomDTO } from '../models/chat-rooms.dto'
import { ChatRooms } from '../models/chat-rooms.model'
import { CreateMessageDTO, UpdateMessageDTO } from '../models/message.dto'
import { ChatMessages, TeamsChatNotification } from '../models/message.model'

import { ChatsApiService } from './chats-api.service'
import { ChatsMessagesApiService } from './chats-messages-api.service'

@Injectable({
	providedIn: 'root',
})
export class ChatsService {
	private refetchChatsSubject = new Subject<void>()
	private currentChatRoomSubject = new BehaviorSubject<ChatRooms | null>(null)
	private currentChatRoomMessagesSubject = new BehaviorSubject<ChatMessages[]>([])

	refetchChats$ = this.refetchChatsSubject.asObservable()
	currentChatRoom$ = this.currentChatRoomSubject.asObservable()
	currentChatRoomMessages$ = this.currentChatRoomMessagesSubject.asObservable()

	constructor(
		private teamsService: TeamsService,
		private chatsApiService: ChatsApiService,
		private rxStompService: RxStompService,
		private chatsMessagesApiService: ChatsMessagesApiService,
	) {}

	subscribeCurrentChatMessages() {
		return this.currentChatRoom$.pipe(
			switchMap(chat => {
				if (chat) {
					return this.subscribeToMessages(chat.id)
				}

				return throwError(() => Error('No current chat room'))
			}),
		)
	}

	sendMessageByCurrentChat(dto: CreateMessageDTO) {
		return this.currentChatRoom$.pipe(
			switchMap(chat => {
				if (chat) {
					return this.chatsMessagesApiService.sendMessage(chat.id, dto)
				}

				return throwError(() => Error('No current chat room'))
			}),
		)
	}

	updateMessage(messageId: string, dto: UpdateMessageDTO) {
		return combineLatest([this.teamsService.currentTeam$, this.currentChatRoom$]).pipe(
			switchMap(([team, chat]) => {
				if (chat && team) {
					return this.chatsMessagesApiService.updateMessage(team.id, chat.id, messageId, dto)
				}

				return throwError(() => Error('No current chat room or team'))
			}),
		)
	}

	getHistoryMessages() {
		return this.currentChatRoom$.pipe(
			switchMap(chat => {
				if (chat) {
					return this.chatsMessagesApiService.getHistoryMessages(chat.id)
				}

				return throwError(() => Error('No current chat room'))
			}),
		)
	}

	deleteMessage(messageId: string) {
		return combineLatest([this.teamsService.currentTeam$, this.currentChatRoom$]).pipe(
			switchMap(([team, chat]) => {
				if (chat && team) {
					return this.chatsMessagesApiService.deleteMessage(team.id, chat.id, messageId)
				}

				return throwError(() => Error('No current chat room or team'))
			}),
		)
	}

	readAllCurrentMessages() {
		return this.currentChatRoom$.pipe(
			switchMap(chat => {
				if (chat) {
					return this.chatsMessagesApiService.readAllMessages(chat.id)
				}

				return throwError(() => Error('No current chat room'))
			}),
		)
	}

	subscribeToMessages(chatRoomId: number) {
		return this.rxStompService.watch(`/chats/${chatRoomId}/messages`).pipe(
			map(response => {
				const data = JSON.parse(response.body) as object
				if (this.isChatMessageType(data)) {
					return data
				}

				return null
			}),
		)
	}

	private isChatMessageType(object: object): object is ChatMessages {
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

	subscribeCurrentTeamChatsNotifications() {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.subscribeTeamNotifications(team.id)
				}

				return throwError(() => Error('No current team room'))
			}),
		)
	}

	subscribeTeamNotifications(teamId: number) {
		return this.rxStompService.watch(`/chats/teams/${teamId}/notifications`).pipe(
			map(response => {
				const data = JSON.parse(response.body) as object
				if (this.isTeamChatNotificationType(data)) {
					return data
				}

				return null
			}),
		)
	}

	private isTeamChatNotificationType(object: object): object is TeamsChatNotification {
		if ('teamId' in object && 'chatRoomId' in object && 'timestamp' in object && 'type' in object) {
			return true
		}

		return false
	}

	setCurrentChat(chatRoom: ChatRooms | null) {
		if (chatRoom) {
			if (chatRoom.id !== this.currentChatRoomSubject.value?.id) {
				this.currentChatRoomSubject.next(chatRoom)
				this.currentChatRoomMessagesSubject.next([])
			}
		} else {
			this.currentChatRoomSubject.next(null)
			this.currentChatRoomMessagesSubject.next([])
		}
	}

	addMessage(message: ChatMessages | ChatMessages[]) {
		if (Array.isArray(message)) {
			this.currentChatRoomMessagesSubject.next([
				...this.currentChatRoomMessagesSubject.value,
				...message,
			])
		} else {
			this.currentChatRoomMessagesSubject.next([
				...this.currentChatRoomMessagesSubject.value,
				message,
			])
		}
	}

	getChatRooms(filter: ChatRoomsFilter) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.chatsApiService.getChatRooms(team.id, filter)
				}

				return throwError(() => Error('No current team'))
			}),
		)
	}

	getChatRoomById(chartRoomId: number) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.chatsApiService.getChatRoomById(team.id, chartRoomId)
				}

				return throwError(() => Error('No current team'))
			}),
		)
	}

	createChatRoom(dto: CreateChatRoomDTO) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.chatsApiService.createChatRoom(team.id, dto)
				}

				return throwError(() => Error('No current team'))
			}),
		)
	}

	updateChatRoom(chatRoomId: number, dto: UpdateChatRoomDTO) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.chatsApiService.updateChatRoom(team.id, chatRoomId, dto)
				}

				return throwError(() => Error('No current team'))
			}),
		)
	}

	deleteChatRoom(chatRoomId: number) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.chatsApiService.deleteChatRoom(team.id, chatRoomId)
				}

				return throwError(() => Error('No current team'))
			}),
		)
	}

	refetchChats() {
		this.refetchChatsSubject.next()
	}
}
