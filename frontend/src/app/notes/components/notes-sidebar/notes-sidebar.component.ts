import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
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
	distinctUntilChanged,
	takeUntil,
	throwError,
} from 'rxjs'

import { ToastService } from 'src/app/shared/services/toastr.service'

import { CreateNoteDTO } from '../../models/create-note.dto'
import { NotesFilterDTO } from '../../models/note-filter.dto'
import { Notes } from '../../models/note.type'
import { NotesService } from '../../services/notes-api.service'
import { CreateNoteDialogComponent } from '../dialogs/create-note-dialog/create-note-dialog.component'

@Component({
	selector: 'app-notes-sidebar',
	templateUrl: './notes-sidebar.component.html',
	styleUrls: ['./notes-sidebar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesSidebarComponent implements OnInit, OnDestroy {
	@Output() selectedNoteId = new EventEmitter<number>()

	private unsubscribe$ = new Subject<void>()
	selectedNote: Notes | null = null
	notes: Notes[] = []
	searchForm = new FormGroup({
		searchValue: new FormControl(''),
	})

	constructor(
		private dialog: MatDialog,
		private noteService: NotesService,
		private toastrService: ToastService,
		private cd: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this.getNotes()

		this.searchForm.valueChanges
			.pipe(
				debounceTime(500),
				distinctUntilChanged(),
				takeUntil(this.unsubscribe$)
			)
			.subscribe(() => this.getNotes())
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next()
		this.unsubscribe$.complete()
	}

	onSelectNote(note: Notes | null): void {
		if (note) {
			this.selectedNote = note
			this.selectedNoteId.emit(note.id)
		}
	}

	onCreateNote(): void {
		const dialogRef = this.dialog.open<any, any, CreateNoteDTO>(
			CreateNoteDialogComponent,
			{
				minWidth: '30%',
			}
		)

		dialogRef
			.afterClosed()
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(dto => {
				if (!dto) return

				this.noteService
					.createNote(dto)
					.pipe(
						takeUntil(this.unsubscribe$),
						catchError(() => {
							this.toastrService.error('Failed to create note')
							return EMPTY
						})
					)
					.subscribe(() => {
						this.toastrService.open('Successfully created note')
						this.getNotes()
					})
			})
	}

	noteTrackBy(index: number, note: Notes): number {
		return note.id
	}

	private getNotes(): void {
		const formValues = this.searchForm.getRawValue()

		const filter: NotesFilterDTO = {
			searchValue: formValues.searchValue ?? undefined,
		}

		this.noteService
			.getNotes(filter)
			.pipe(
				catchError(err => {
					this.toastrService.error('Failed to get notes')
					return throwError(() => err)
				}),
				takeUntil(this.unsubscribe$)
			)
			.subscribe(notes => {
				this.notes = notes
				this.cd.markForCheck()
			})
	}

	deleteNote(event: Event, id: number): void {
		event.stopPropagation()

		this.noteService
			.deleteNote(id)
			.pipe(
				catchError(err => {
					this.toastrService.error('Failed to delete note')
					return throwError(() => err)
				}),
				takeUntil(this.unsubscribe$)
			)
			.subscribe(() => {
				this.toastrService.open('Successfully deleted a note')
				this.getNotes()
			})
	}
}
