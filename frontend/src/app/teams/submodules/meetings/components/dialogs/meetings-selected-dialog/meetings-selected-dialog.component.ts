import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router'

import { catchError, switchMap, take, throwError } from 'rxjs'

import { TeamsService } from 'src/app/teams/services/teams.service'

import { ToastService } from '../../../../../../shared/services/toast.service'
import { MeetingsDTO } from '../../../models/meetings.types'

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
		private router: Router,
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
						this.router.navigate(['hub', 'teams', team.id, 'meetings', this.selectedMeeting.id])
					}
				})
		}

		this.dialogRef.close(null)
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
