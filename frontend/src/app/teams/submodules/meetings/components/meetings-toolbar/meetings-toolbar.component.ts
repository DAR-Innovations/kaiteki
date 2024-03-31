import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { EMPTY, catchError, switchMap, take, throwError } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import { MeetingsService } from '../../services/meetings.service'
import { CreateMeetingDialogComponent } from '../dialogs/create-meeting-dialog/create-meeting-dialog.component'

@Component({
	selector: 'app-meetings-toolbar',
	templateUrl: './meetings-toolbar.component.html',
	styleUrls: ['./meetings-toolbar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingsToolbarComponent {
	constructor(
		private dialog: MatDialog,
		private meetingsService: MeetingsService,
		private toastService: ToastService,
	) {}

	onCreateButtonClick(event: Event) {
		event.preventDefault()

		const dialogRef = this.dialog.open(CreateMeetingDialogComponent, {
			minWidth: '30%',
			minHeight: '50%',
		})

		dialogRef
			.afterClosed()
			.pipe(
				switchMap(dto => {
					if (dto) {
						return this.meetingsService.createMeeting(dto)
					}

					return EMPTY
				}),
				catchError(err => {
					this.toastService.open('Failed to create a meeting')
					return throwError(() => err)
				}),
				take(1),
			)
			.subscribe(() => {
				this.toastService.open('Successfully created meeting')
				this.meetingsService.refetchMeetings()
			})
	}
}
