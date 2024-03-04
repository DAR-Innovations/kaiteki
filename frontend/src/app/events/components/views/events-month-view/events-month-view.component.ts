import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { CalendarEvent } from 'angular-calendar'
import { Subject } from 'rxjs'

import { SelectedEventDialogComponent } from '../../dialogs/selected-event-dialog/selected-event-dialog.component'

@Component({
	selector: 'app-events-month-view',
	templateUrl: './events-month-view.component.html',
	styleUrls: ['./events-month-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsMonthViewComponent {
	@Input() events: any[] = []

	viewDate: Date = new Date()
	refresh = new Subject<void>()

	constructor(private dialog: MatDialog) {}

	onSelectEvent(meeting: CalendarEvent<any>) {
		const dialogRef = this.dialog.open(SelectedEventDialogComponent, {
			data: { selectedMeeting: meeting },
		})

		dialogRef.afterClosed().subscribe(result => {
			console.log(result)
		})
	}
}
