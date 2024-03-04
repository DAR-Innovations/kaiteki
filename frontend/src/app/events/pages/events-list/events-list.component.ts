import { ChangeDetectionStrategy, Component } from '@angular/core'

import { CalendarView } from 'angular-calendar'
import { addDays, addHours, startOfDay, subDays, subHours } from 'date-fns'
import { of } from 'rxjs'

@Component({
	selector: 'app-events-list',
	templateUrl: './events-list.component.html',
	styleUrls: ['./events-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsListComponent {
	events$ = of([
		{
			id: 1,
			title: 'Meeting with SentineOne',
			description:
				'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita,dolorem enim deserunt est',
			start: addHours(startOfDay(new Date()), 2),
			end: addHours(new Date(), 2),
			status: 'In proccess',
		},
		{
			id: 2,
			title: 'Standup for developers',
			description:
				'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita,dolorem enim deserunt est',
			start: subHours(startOfDay(new Date()), 4),
			end: addHours(new Date(), 0),
			status: 'Planned',
		},
		{
			id: 3,
			title: 'Standup for developers',
			description:
				'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita,dolorem enim deserunt est',
			start: subHours(startOfDay(new Date()), 4),
			status: 'Planned',
		},
		{
			id: 4,
			title: 'Meeting with SentineOne',
			description:
				'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita,dolorem enim deserunt est',
			start: subDays(startOfDay(new Date()), 2),
			status: 'In proccess',
		},
		{
			id: 5,
			title: 'Standup for developers',
			description:
				'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita,dolorem enim deserunt est',
			start: addDays(startOfDay(new Date()), 2),
			end: addDays(new Date(), 2),
			status: 'Planned',
		},
	])
	filter: any = {}
	calendarView = CalendarView

	onFilter(filter: any) {
		this.filter = filter
	}
}
