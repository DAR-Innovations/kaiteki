import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

import { QuillModules } from 'ngx-quill'
import {
	Subject,
	catchError,
	debounceTime,
	distinctUntilChanged,
	takeUntil,
	throwError,
} from 'rxjs'

import { ToastService } from 'src/app/shared/services/toastr.service'

import { Notes } from '../../models/note.type'
import { NotesService } from '../../services/notes.service'

@Component({
	selector: 'app-note-edit',
	templateUrl: './note-edit.component.html',
	styleUrls: ['./note-edit.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteEditComponent implements OnDestroy {
	unsubscribe$ = new Subject<void>()
	selectedNote: Notes | null = null

	form = new FormGroup({
		content: new FormControl(''),
	})

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

	constructor(
		private notesService: NotesService,
		private route: ActivatedRoute,
		private toastrService: ToastService,
		private cd: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this.getNote()

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

	private getNote() {
		const id = this.getIdFromParams()
		if (!id) return

		this.notesService
			.getNote(id)
			.pipe(
				takeUntil(this.unsubscribe$),
				catchError(err => {
					this.toastrService.open('Failed to get note')
					return throwError(() => err)
				})
			)
			.subscribe(note => {
				this.selectedNote = note
				this.editorContent.patchValue(note.content)
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

	private getIdFromParams() {
		const paramId = this.route.snapshot.paramMap.get('id')
		if (!paramId) return

		const numberId = Number(paramId)
		if (isNaN(numberId)) return

		return numberId
	}

	get editorContent() {
		return this.form.get('content')!
	}
}
