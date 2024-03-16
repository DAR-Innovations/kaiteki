import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Input,
} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'

import {
	EMPTY,
	Subject,
	catchError,
	switchMap,
	take,
	takeUntil,
	throwError,
} from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import { TeamsService } from 'src/app/teams/services/teams.service'

import { UpdateChatRoomDTO } from '../../models/chat-rooms.dto'
import { ChatRooms } from '../../models/chat-rooms.model'
import { CreateMessageDTO } from '../../models/message.dto'
import { ChatMessages, ChatMessagesType } from '../../models/message.model'
import { ChatsService } from '../../services/chats.service'
import {
	UpdateChatDialogComponent,
	UpdateChatDialogComponentProps,
} from '../dialogs/update-chat-dialog/update-chat-dialog.component'

@Component({
	selector: 'app-chat-room',
	templateUrl: './chat-room.component.html',
	styleUrls: ['./chat-room.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatRoomComponent {
	private unsubscribe$ = new Subject<void>()

	@Input() includeBackButton = false

	currentChat$ = this.chatsService.currentChatRoom$
	messages: ChatMessages[] = []
	currentTeamMember$ = this.teamsService.currentTeamMember$

	form = new FormGroup({
		content: new FormControl<string>('', [
			Validators.required,
			Validators.max(2048),
			Validators.min(1),
		]),
	})

	constructor(
		private chatsService: ChatsService,
		private toastrService: ToastService,
		private dialog: MatDialog,
		private teamsService: TeamsService,
		private cd: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.chatsService
			.getHistoryMessages()
			.pipe(
				catchError(err => {
					this.toastrService.error('Failed to get messages history')
					return throwError(() => err)
				}),
				takeUntil(this.unsubscribe$)
			)
			.subscribe(data => {
				this.messages = data
				this.cd.markForCheck()
			})

		this.chatsService
			.subscribeRealTimeChatMessages()
			.pipe(
				catchError(err => {
					this.toastrService.error('Failed to receive messages')
					return throwError(() => err)
				}),
				takeUntil(this.unsubscribe$)
			)
			.subscribe(resp => {
				if (resp) {
					this.messages.push(resp)
					this.scrollToBottom()
					this.cd.markForCheck()
				}
			})
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next()
		this.unsubscribe$.complete()
	}

	scrollToBottom(): void {
		const element = document.getElementById('chatsContainerId')

		if (element) {
			element.scrollTop = element.scrollHeight
		}
	}

	messageTrackBy(index: number, message: ChatMessages) {
		return message.id
	}

	onSendMessage() {
		const { content } = this.form.value

		this.currentTeamMember$
			.pipe(
				switchMap(member => {
					const dto: CreateMessageDTO = {
						content: content!,
						type: ChatMessagesType.TEXT,
						senderId: member!.id,
					}

					return this.chatsService.sendMessageByCurrentChat(dto)
				}),
				catchError(err => {
					this.toastrService.error('Failed to send message')
					return throwError(() => err)
				}),
				take(1)
			)
			.subscribe(() => {
				this.form.reset()
				this.cd.markForCheck()
			})
	}

	onDeleteClick(chat: ChatRooms) {
		this.chatsService
			.deleteChatRoom(chat.id)
			.pipe(
				catchError(err => {
					this.toastrService.error('Failed to delete chat')
					return throwError(() => err)
				}),
				take(1)
			)
			.subscribe(() => {
				this.toastrService.open('Successfully deleted chat')
				this.chatsService.setCurrentChat(null)
				this.chatsService.refetchChats()
			})
	}

	onEditClick(chat: ChatRooms) {
		const dialogRef = this.dialog.open<
			any,
			UpdateChatDialogComponentProps,
			UpdateChatRoomDTO
		>(UpdateChatDialogComponent, {
			minWidth: '30%',
			data: {
				chat: chat,
			},
		})

		dialogRef
			.afterClosed()
			.pipe(
				switchMap(form => {
					if (form) {
						return this.chatsService.updateChatRoom(chat.id, form)
					}

					return EMPTY
				}),
				switchMap(() => {
					return this.chatsService.getChatRoomById(chat.id)
				}),
				catchError(err => {
					this.toastrService.error('Failed to update chat')
					return throwError(() => err)
				}),
				take(1)
			)
			.subscribe(updatedChat => {
				this.toastrService.open('Successfully updated chat')
				this.chatsService.setCurrentChat(updatedChat)
				this.chatsService.refetchChats()
			})
	}
}
