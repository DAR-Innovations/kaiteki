import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'

import { FileUploadValidators } from '@iplab/ngx-file-upload'

import { ToastService } from 'src/app/shared/services/toast.service'

import { UploadTeamFileDTO } from '../../../models/team-files.dto'

@Component({
	selector: 'app-upload-file-dialog',
	templateUrl: './upload-file-dialog.component.html',
	styleUrls: ['./upload-file-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadFileDialogComponent {
	form = new FormGroup({
		description: new FormControl<string>('', [Validators.required]),
		files: new FormControl<File[]>([], [FileUploadValidators.filesLimit(1)]),
	})

	constructor(
		private dialogRef: MatDialogRef<UploadFileDialogComponent>,
		private toastService: ToastService
	) {}

	onBackClick(): void {
		this.dialogRef.close()
	}

	onSubmit() {
		const { description, files } = this.form.getRawValue()
		const file = files?.[0] ?? undefined

		if (!file || !description) {
			this.toastService.error('Missing required fields')
			return
		}

		const dto: UploadTeamFileDTO = {
			description: description,
			file: file,
		}

		this.dialogRef.close(dto)
	}
}
