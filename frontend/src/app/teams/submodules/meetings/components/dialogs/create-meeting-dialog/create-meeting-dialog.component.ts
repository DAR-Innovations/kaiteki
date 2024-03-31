import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

import dayjs from 'dayjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import { TeamsService } from 'src/app/teams/services/teams.service'

import { CreateMeetingDTO } from '../../../models/meetings.dto'

@Component({
	selector: 'app-create-meeting-dialog',
	templateUrl: './create-meeting-dialog.component.html',
	styleUrls: ['./create-meeting-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMeetingDialogComponent {
	isAllDayToggled = false
	form = this.createForm()

	allTeamMembers$ = this.teamsService.getAllTeamMembers()

	constructor(
		public dialogRef: MatDialogRef<CreateMeetingDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: unknown,
		private teamsService: TeamsService,
		private cd: ChangeDetectorRef,
		private toastService: ToastService,
	) {}

	toggleAllDay(active: boolean) {
		this.isAllDayToggled = active

		const endDateControl = this.form.get('endDate')

		if (active) {
			endDateControl?.disable()
			const currentDate = new Date()
			currentDate.setHours(23, 59, 59, 0)
			endDateControl?.setValue(currentDate)
		} else {
			endDateControl?.enable()
			const hourAddedDate = dayjs().add(1, 'hour')
			endDateControl?.setValue(hourAddedDate.toDate())
		}

		this.cd.markForCheck()
	}

	onBackClick(): void {
		this.dialogRef.close()
	}

	onSubmit() {
		const { title, description, startDate, endDate, invitedMemberIds } = this.form.getRawValue()

		if (!title || !description || !startDate || !endDate || !invitedMemberIds) {
			this.toastService.error('Missing required fields')
			return
		}

		const dto: CreateMeetingDTO = {
			title: title,
			description: description,
			startDate: startDate,
			endDate: endDate,
			invitedMemberIds: invitedMemberIds,
		}

		this.dialogRef.close(dto)
	}

	private createForm() {
		const currentDate = dayjs()
		const hourAddedDate = currentDate.add(1, 'hour')

		return new FormGroup({
			title: new FormControl<string>('', [Validators.required]),
			description: new FormControl<string>('', [Validators.required]),
			invitedMemberIds: new FormControl<number[]>([], [Validators.required]),
			startDate: new FormControl<Date>(currentDate.toDate(), [Validators.required]),
			endDate: new FormControl<Date>(hourAddedDate.toDate(), [Validators.required]),
		})
	}
}
