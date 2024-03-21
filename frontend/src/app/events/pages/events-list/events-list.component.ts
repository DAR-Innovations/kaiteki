import { ChangeDetectionStrategy, Component } from '@angular/core'

import { CalendarView } from 'angular-calendar'

import { EventsService } from '../../services/events.service'
import { EventsFilter } from '../models/events-dto.model'

@Component({
	selector: 'app-events-list',
	templateUrl: './events-list.component.html',
	styleUrls: ['./events-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsListComponent {
	events$ = this.eventsService.getEvents()

	filter: EventsFilter = {}
	calendarViews = CalendarView

	constructor(private eventsService: EventsService) {}

	onFilter(filter: EventsFilter) {
		this.filter = filter
	}
}
