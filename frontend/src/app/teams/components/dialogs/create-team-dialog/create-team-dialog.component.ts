import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'

import { ToastService } from 'src/app/shared/services/toast.service'

import { CreateTeamDTO } from 'src/app/teams/models/teams.model'

@Component({
	selector: 'app-create-team-dialog',
	templateUrl: './create-team-dialog.component.html',
	styleUrls: ['./create-team-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTeamDialogComponent {
	form = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
		description: new FormControl('', [Validators.required]),
	})

	constructor(
		private dialogRef: MatDialogRef<CreateTeamDialogComponent, CreateTeamDTO>,
		private toastService: ToastService,
	) {}

	onBackClick() {
		this.dialogRef.close()
	}

	onSubmitClick() {
		const { name, description } = this.form.getRawValue()

		if (!name || !description) {
			this.toastService.error('Missing required fields')
			return
		}

		const dto: CreateTeamDTO = {
			name: name,
			description: description,
		}

		this.dialogRef.close(dto)
	}
}
