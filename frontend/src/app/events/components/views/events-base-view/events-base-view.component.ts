import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { CalendarEvent } from 'angular-calendar'
import { Subject } from 'rxjs'

import { Events } from 'src/app/events/pages/models/events.model'

@Component({
	selector: 'app-events-base-view',
	templateUrl: './events-base-view.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsBaseViewComponent {
	@Input() set events(v: Events[]) {
		this.displayEvents = v.map(e => ({
			...e,
			start: new Date(e.start),
			end: new Date(e.end),
		}))
	}

	displayEvents: Events[] = []
	viewDate: Date = new Date()
	refresh = new Subject<void>()

	constructor(protected dialog: MatDialog) {}

	onSelectEvent(meeting: CalendarEvent) {
		console.log(meeting)
	}
}
