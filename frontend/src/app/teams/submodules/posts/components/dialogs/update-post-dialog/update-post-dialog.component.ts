import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

import { FileUploadValidators } from '@iplab/ngx-file-upload'
import { QuillModules } from 'ngx-quill'

import { ToastService } from 'src/app/shared/services/toast.service'

import { UpdatePostDTO } from '../../../models/post.dto'
import { Posts } from '../../../models/posts.model'

export interface UpdatePostDialogComponentProps {
	post: Posts
}

@Component({
	selector: 'app-update-post-dialog',
	templateUrl: './update-post-dialog.component.html',
	styleUrls: ['./update-post-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdatePostDialogComponent implements OnInit {
	form = new FormGroup({
		title: new FormControl('', [Validators.required]),
		content: new FormControl('', [Validators.required]),
		description: new FormControl('', [Validators.required]),
		image: new FormControl<File[] | null>(null, [FileUploadValidators.filesLimit(1)]),
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
		public dialogRef: MatDialogRef<UpdatePostDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: UpdatePostDialogComponentProps,
		private toastService: ToastService,
	) {}

	ngOnInit(): void {
		this.fillExistingPost(this.data.post)
	}

	fillExistingPost(post: Posts) {
		// if (!post.heroImageId) {
		// }

		this.form.patchValue({
			title: post.title,
			description: post.description,
			content: post.content,
			image: [],
		})

		// this.filesService
		// 	.getFileBlob(post.heroImageId)
		// 	.pipe(take(1))
		// 	.subscribe(blob => {
		// 		const file = new File([blob], 'Hero Image')

		// 		this.form.patchValue({
		// 			title: post.title,
		// 			description: post.description,
		// 			content: post.content,
		// 			image: [file],
		// 		})
		// 	})
	}

	get isFormInvalid() {
		return this.form.invalid
	}

	onSubmit() {
		const formValues = this.form.value
		const image = formValues.image?.[0] ?? undefined

		if (!formValues.title || !formValues.description || !formValues.content) {
			this.toastService.error('Missing required fields')
			return
		}

		const dto: UpdatePostDTO = {
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
