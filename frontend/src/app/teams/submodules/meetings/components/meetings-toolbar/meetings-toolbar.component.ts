import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { EMPTY, catchError, filter, switchMap, take, throwError } from 'rxjs'

import { ToastrService } from 'src/app/shared/services/toastr.service'

import { MeetingsService } from '../../services/meetings.service'
import { CreateMeetingDialogComponent } from '../dialogs/create-meeting-dialog/create-meeting-dialog.component'

@Component({
	selector: 'app-meetings-toolbar',
	templateUrl: './meetings-toolbar.component.html',
	styleUrls: ['./meetings-toolbar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingsToolbarComponent {
	views: string[] = ['List', 'Calendar']
	selectedView = this.views[0]

	sortings: string[] = ['Priority ASC', 'Prioriy DESC', 'Date ASC', 'Date DESC']
	selectedSorting = this.sortings[0]

	onChangeView(value: string) {
		this.selectedView = value
	}

	onChangeSort(value: string) {
		this.selectedSorting = value
	}

	constructor(
		private dialog: MatDialog,
		private meetingsService: MeetingsService,
		private toastrService: ToastrService
	) {}

	onCreateButtonClick(event: Event) {
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
					this.toastrService.open('Failed to create a meeting')
					return throwError(() => err)
				}),
				take(1)
			)
			.subscribe(() => {
				this.toastrService.open('Successfully created meeting')
				this.meetingsService.refetchMeetings()
			})
	}
}
