import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'

import {
	EMPTY,
	Subject,
	catchError,
	debounceTime,
	startWith,
	switchMap,
	takeUntil,
	throwError,
} from 'rxjs'

import { ToastrService } from 'src/app/shared/services/toastr.service'

import { ChatRoomsFilter } from '../../models/chat-rooms.dto'
import { ChatRooms } from '../../models/chat-rooms.model'
import { ChatsService } from '../../services/chats.service'
import { CreateGroupDialogComponent } from '../dialogs/create-group-dialog/create-group-dialog.component'
import { CreateSingleDialogComponent } from '../dialogs/create-single-dialog/create-single-dialog.component'

@Component({
	selector: 'app-chats-sidebar',
	templateUrl: './chats-sidebar.component.html',
	styleUrls: ['./chats-sidebar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsSidebarComponent implements OnInit, OnDestroy {
	@Output() selectedChatId = new EventEmitter<number>()

	private unsubscribe$ = new Subject<void>()

	filter: ChatRoomsFilter = {}
	searchForm = new FormGroup({
		value: new FormControl(''),
	})

	currentChatRoom$ = this.chatsService.currentChatRoom$
	chats$ = this.chatsService.refetchChats$.pipe(
		startWith([]),
		switchMap(() => this.loadChats())
	)

	constructor(
		private dialog: MatDialog,
		private chatsService: ChatsService,
		private toastrService: ToastrService
	) {}

	ngOnInit(): void {
		this.trackChangesChats()
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next()
		this.unsubscribe$.complete()
	}

	chatsTrackBy(index: number, chat: ChatRooms) {
		return chat.id
	}

	private trackChangesChats() {
		this.searchForm.valueChanges
			.pipe(debounceTime(500), takeUntil(this.unsubscribe$))
			.subscribe(form => {
				const { value } = form
				const filter: ChatRoomsFilter = {
					searchValue: value ?? undefined,
				}

				this.filter = filter
				this.chatsService.refetchChats()
			})
	}

	private loadChats() {
		return this.chatsService.getChatRooms(this.filter)
	}

	onSelectChat(chat: ChatRooms) {
		if (chat) {
			this.selectedChatId.emit(chat.id)
		}
	}

	onCreateGroupClick() {
		const dialogRef = this.dialog.open(CreateGroupDialogComponent, {
			minWidth: '30%',
			data: {},
		})

		dialogRef
			.afterClosed()
			.pipe(
				switchMap(form => {
					if (form) {
						return this.chatsService.createChatRoom(form)
					}

					return EMPTY
				}),
				catchError(err => {
					this.toastrService.error('Failed to create chat room')
					return throwError(() => err)
				})
			)
			.subscribe(() => {
				this.toastrService.error('Successfully created chat')
				this.chatsService.refetchChats()
			})
	}

	onCreateSingleClick() {
		const dialogRef = this.dialog.open(CreateSingleDialogComponent, {
			minWidth: '30%',
			data: {},
		})

		dialogRef
			.afterClosed()
			.pipe(
				switchMap(form => {
					if (form) {
						return this.chatsService.createChatRoom(form)
					}

					return EMPTY
				}),
				catchError(err => {
					this.toastrService.error('Failed to create chat room')
					return throwError(() => err)
				})
			)
			.subscribe(() => {
				this.toastrService.error('Successfully created chat')
				this.chatsService.refetchChats()
			})
	}
}
