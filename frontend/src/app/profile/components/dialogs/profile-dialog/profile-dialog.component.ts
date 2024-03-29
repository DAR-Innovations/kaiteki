import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'

import { UpdateProfileDTO } from 'src/app/profile/models/update-profile.dto'

@Component({
	selector: 'app-profile-dialog',
	templateUrl: './profile-dialog.component.html',
	styleUrls: ['./profile-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileDialogComponent {
	form = new FormGroup({
		avatar: new FormControl('', []),
		firstname: new FormControl('', [Validators.required]),
		lastname: new FormControl('', [Validators.required]),
		birthDate: new FormControl('', [Validators.required]),
		latestTeam: new FormControl(''),
		latestTeamPosition: new FormControl(''),
	})

	constructor(private dialogRef: MatDialogRef<ProfileDialogComponent, UpdateProfileDTO>) {}

	onBackClick() {
		this.dialogRef.close()
	}

	onSubmitClick() {
		const values = this.form.getRawValue()

		this.dialogRef.close(values)
	}
}
