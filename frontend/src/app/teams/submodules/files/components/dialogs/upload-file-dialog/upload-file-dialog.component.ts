import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'

import { FileUploadValidators } from '@iplab/ngx-file-upload'

import { ToastService } from 'src/app/shared/services/toastr.service'

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
		private toastrService: ToastService
	) {}

	onBackClick(): void {
		this.dialogRef.close()
	}

	onSubmit() {
		const formValues = this.form.value
		const file = formValues.files?.[0] ?? undefined

		if (!file) {
			this.toastrService.error('File is missing')
			return
		}

		const dto: UploadTeamFileDTO = {
			description: formValues.description!,
			file: file,
		}

		this.dialogRef.close(dto)
	}
}
