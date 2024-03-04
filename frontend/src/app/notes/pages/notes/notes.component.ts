import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

import { QuillModules } from 'ngx-quill'
import {
	EMPTY,
	Subject,
	catchError,
	debounceTime,
	distinctUntilChanged,
	takeUntil,
	throwError,
} from 'rxjs'

import { ToastrService } from 'src/app/shared/services/toastr.service'

import { Notes } from '../../models/note.type'
import { NotesService } from '../../services/notes.service'

@Component({
	selector: 'app-notes',
	templateUrl: './notes.component.html',
	styleUrls: ['./notes.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent implements OnDestroy, OnInit {
	private unsubscribe$ = new Subject<void>()
	selectedNote: Notes | null = null

	quillConfig: QuillModules = {
		history: true,
		toolbar: {
			container: [
				[{ header: [1, 2, 3, 4, 5, 6, false] }],
				['bold', 'italic', 'underline', 'strike'],
				[{ align: [] }],
				[{ list: 'ordered' }, { list: 'bullet' }],
				[{ color: [] }, { background: [] }],
				['link'],
				['clean'],
			],
		},
	}

	form = new FormGroup({
		content: new FormControl(''),
	})

	constructor(
		private notesService: NotesService,
		private toastrService: ToastrService,
		private cd: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this.editorContent.valueChanges
			.pipe(
				debounceTime(2000),
				distinctUntilChanged(),
				takeUntil(this.unsubscribe$)
			)
			.subscribe(res => this.onNoteUpdate(res))
	}

	ngOnDestroy(): void {
		this.updateNote()

		this.unsubscribe$.next()
		this.unsubscribe$.complete()
	}

	onSelectNote(noteId: number) {
		if (this.selectedNote?.id == noteId) return

		this.notesService
			.getNote(noteId)
			.pipe(
				catchError(err => {
					this.toastrService.open('Failed to get note')
					return throwError(() => err)
				}),
				takeUntil(this.unsubscribe$)
			)
			.subscribe(response => {
				this.selectedNote = response
				this.editorContent.patchValue(response.content)
				this.cd.markForCheck()
			})
	}

	private onNoteUpdate(content: string | null) {
		if (!this.selectedNote) return
		content = content ?? ''

		this.notesService
			.updateNote(this.selectedNote.id, { content })
			.pipe(
				takeUntil(this.unsubscribe$),
				catchError(err => {
					this.toastrService.open('Failed to save note')
					return throwError(() => err)
				})
			)
			.subscribe()
	}

	private updateNote() {
		const formValue = this.form.getRawValue()
		this.onNoteUpdate(formValue.content)
	}

	get editorContent() {
		return this.form.get('content')!
	}
}
