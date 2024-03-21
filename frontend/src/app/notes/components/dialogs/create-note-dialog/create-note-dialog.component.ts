import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'

import { ToastService } from 'src/app/shared/services/toast.service'

import { CreateNoteDTO } from 'src/app/notes/models/create-note.dto'

@Component({
	selector: 'app-create-note-dialog',
	templateUrl: './create-note-dialog.component.html',
	styleUrls: ['./create-note-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNoteDialogComponent {
	form = new FormGroup({
		title: new FormControl('', [Validators.required]),
	})

	constructor(
		private dialogRef: MatDialogRef<CreateNoteDialogComponent, CreateNoteDTO>,
		private toastService: ToastService
	) {}

	onBackClick() {
		this.dialogRef.close()
	}

	onSubmitClick() {
		const { title } = this.form.getRawValue()

		if (!title) {
			this.toastService.error('Missing title')
			return
		}

		const dto: CreateNoteDTO = {
			title: title,
		}

		this.dialogRef.close(dto)
	}
}
