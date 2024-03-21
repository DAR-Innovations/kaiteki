import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { CalendarEvent } from 'angular-calendar'
import { Subject, take } from 'rxjs'

import { MeetingsDTO } from '../../../models/meetings.types'
import { MeetingsSelectedDialogComponent } from '../../dialogs/meetings-selected-dialog/meetings-selected-dialog.component'

@Component({
	selector: 'app-meetings-calendar-view',
	templateUrl: './meetings-calendar-view.component.html',
	styleUrls: ['./meetings-calendar-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingsCalendarViewComponent {
	@Input() set meetings(values: MeetingsDTO[]) {
		this.displayMeetings = values.map(meeting => ({
			...meeting,
			start: new Date(meeting.start),
			end: new Date(meeting.end),
		}))
	}

	displayMeetings: MeetingsDTO[] = []
	viewDate: Date = new Date()
	refresh = new Subject<void>()

	constructor(private dialog: MatDialog) {}

	onSelectMeeting(meeting: CalendarEvent<MeetingsDTO>) {
		const dialogRef = this.dialog.open(MeetingsSelectedDialogComponent, {
			data: { selectedMeeting: meeting },
		})

		dialogRef.afterClosed().pipe(take(1)).subscribe()
	}
}
