import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

import { FileUploadValidators } from '@iplab/ngx-file-upload'
import { QuillModules } from 'ngx-quill'

import { ToastService } from 'src/app/shared/services/toast.service'

import { CreatePostDTO } from '../../../models/post.dto'

@Component({
	selector: 'app-create-post-dialog',
	templateUrl: './create-post-dialog.component.html',
	styleUrls: ['./create-post-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePostDialogComponent {
	form = new FormGroup({
		title: new FormControl('', [Validators.required]),
		content: new FormControl('', [Validators.required]),
		description: new FormControl('', [Validators.required]),
		image: new FormControl(null, [FileUploadValidators.filesLimit(1)]),
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
		public dialogRef: MatDialogRef<CreatePostDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: unknown,
		private toastService: ToastService,
	) {}

	onSubmit() {
		const formValues = this.form.value
		const image = formValues.image?.[0] ?? undefined

		if (!formValues.title || !formValues.description || !formValues.content) {
			this.toastService.error('Missing required fields')
			return
		}
		const dto: CreatePostDTO = {
			title: formValues.title,
			description: formValues.description,
			content: formValues.content,
			image: image,
		}

		this.dialogRef.close(dto)
	}

	onBackClick(): void {
		this.dialogRef.close()
	}
}
