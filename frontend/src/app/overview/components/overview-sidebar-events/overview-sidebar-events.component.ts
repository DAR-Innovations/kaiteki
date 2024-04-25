import { ChangeDetectionStrategy, Component } from '@angular/core'

import { EventsService } from 'src/app/events/services/events.service'

@Component({
	selector: 'app-overview-sidebar-events',
	templateUrl: './overview-sidebar-events.component.html',
	styleUrl: './overview-sidebar-events.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewSidebarEventsComponent {
	events$ = this.eventsService.getEvents()

	constructor(private eventsService: EventsService) {}
}
