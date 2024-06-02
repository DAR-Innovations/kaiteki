import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Inject,
	OnInit,
} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

import dayjs from 'dayjs'

import { ToastService } from 'src/app/shared/services/toast.service'
import { isValidHttpUrl } from 'src/app/shared/utils/urls'

import { TeamsService } from 'src/app/teams/services/teams.service'

import { UpdateMeetingDTO } from '../../../models/meetings.dto'
import { MeetingsDTO } from '../../../models/meetings.types'

export interface UpdateMeetingDialogComponentProps {
	meeting: MeetingsDTO
}

@Component({
	selector: 'app-update-meeting-dialog',
	templateUrl: './update-meeting-dialog.component.html',
	styleUrl: './update-meeting-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateMeetingDialogComponent implements OnInit {
	isAllDayToggled = false
	form = this.createForm()

	allTeamMembers$ = this.teamsService.getAllTeamMembers()

	constructor(
		public dialogRef: MatDialogRef<UpdateMeetingDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: UpdateMeetingDialogComponentProps,
		private teamsService: TeamsService,
		private cd: ChangeDetectorRef,
		private toastService: ToastService,
	) {}

	ngOnInit(): void {
		this.patchExistingValues()
	}

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

	private patchExistingValues() {
		const meeting = this.data.meeting

		this.form.patchValue({
			title: meeting.title,
			description: meeting.description,
			endDate: dayjs(meeting.end).toDate(),
			startDate: dayjs(meeting.start).toDate(),
			externalLink: meeting.externalLink,
			invitedMemberIds: meeting.invitedMembers.map(m => m.id),
		})
	}

	onBackClick(): void {
		this.dialogRef.close()
	}

	onSubmit() {
		const { title, description, startDate, endDate, invitedMemberIds, externalLink } =
			this.form.getRawValue()

		if (externalLink && !isValidHttpUrl(externalLink)) {
			this.toastService.error('Provided external link is invalid')
			return
		}

		if (!title || !description || !startDate || !endDate || !invitedMemberIds) {
			this.toastService.error('Missing required fields')
			return
		}

		const dto: UpdateMeetingDTO = {
			title: title,
			description: description,
			startDate: startDate,
			endDate: endDate,
			invitedMemberIds: invitedMemberIds,
			externalLink: externalLink ?? undefined,
		}

		this.dialogRef.close(dto)
	}

	private createForm() {
		const currentDate = dayjs()
		const hourAddedDate = currentDate.add(1, 'hour')

		return new FormGroup({
			title: new FormControl<string>('', [Validators.required]),
			description: new FormControl<string>('', [Validators.required]),
			externalLink: new FormControl<string>('', []),
			invitedMemberIds: new FormControl<number[]>([], [Validators.required]),
			startDate: new FormControl<Date>(currentDate.toDate(), [Validators.required]),
			endDate: new FormControl<Date>(hourAddedDate.toDate(), [Validators.required]),
		})
	}
}
