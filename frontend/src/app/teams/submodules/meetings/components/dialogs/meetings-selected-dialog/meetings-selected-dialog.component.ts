import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog'

import { EMPTY, catchError, switchMap, take, throwError } from 'rxjs'

import { TeamsService } from 'src/app/teams/services/teams.service'

import { ToastService } from '../../../../../../shared/services/toast.service'
import { UpdateMeetingDTO } from '../../../models/meetings.dto'
import { MeetingsDTO } from '../../../models/meetings.types'
import {
	UpdateMeetingDialogComponent,
	UpdateMeetingDialogComponentProps,
} from '../update-meeting-dialog/update-meeting-dialog.component'

import { MeetingsService } from './../../../services/meetings.service'

interface MeetingsSelectedDialogComponentProps {
	selectedMeeting: MeetingsDTO
}

@Component({
	selector: 'app-meetings-selected-dialog',
	templateUrl: './meetings-selected-dialog.component.html',
	styleUrls: ['./meetings-selected-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingsSelectedDialogComponent {
	selectedMeeting: MeetingsDTO | null = null
	currentMember$ = this.teamsService.currentTeamMember$

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: MeetingsSelectedDialogComponentProps,
		public dialogRef: MatDialogRef<MeetingsSelectedDialogComponent>,
		public dialog: MatDialog,
		private teamsService: TeamsService,
		private meetingsService: MeetingsService,
		private toastService: ToastService,
	) {
		this.selectedMeeting = data.selectedMeeting
	}

	onJoinMeetingClick() {
		if (this.selectedMeeting) {
			this.meetingsService
				.joinMeeting(this.selectedMeeting.id)
				.pipe(
					catchError(err => {
						this.toastService.error('Failed to join meeting')
						return throwError(() => err)
					}),
					switchMap(() => this.teamsService.currentTeam$),
					take(1),
				)
				.subscribe(team => {
					if (team && this.selectedMeeting) {
						window.open(this.selectedMeeting.externalLink, '_blank')
					}
				})
		}

		this.dialogRef.close(null)
	}

	onEditClick(event: Event) {
		event.stopPropagation()

		if (!this.selectedMeeting) return

		const dialogRef = this.dialog.open<
			unknown,
			UpdateMeetingDialogComponentProps,
			UpdateMeetingDTO
		>(UpdateMeetingDialogComponent, {
			minWidth: '60%',
			data: { meeting: this.selectedMeeting },
		})

		this.dialogRef.close(null)

		dialogRef
			.afterClosed()
			.pipe(
				switchMap(form => {
					if (form) {
						return this.meetingsService.updateMeeting(this.selectedMeeting!.id, form)
					}

					return EMPTY
				}),
				catchError(err => {
					this.toastService.error('Failed to update meeting')
					return throwError(() => err)
				}),
				take(1),
			)
			.subscribe(() => {
				this.toastService.open('Successfully updated meeting')
				this.meetingsService.refetchMeetings()
			})
	}

	onDeleteMeetingClick() {
		if (this.selectedMeeting) {
			this.meetingsService
				.deleteMeeting(this.selectedMeeting.id)
				.pipe(
					take(1),
					catchError(err => {
						this.toastService.error('Failed to delete the meeting!')
						return throwError(() => err)
					}),
				)
				.subscribe(() => {
					this.toastService.open('Successfully deleted the meeting!')
					this.meetingsService.refetchMeetings()
					this.dialogRef.close(null)
				})
		}
	}
}
