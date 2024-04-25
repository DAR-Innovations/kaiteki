import { ChangeDetectionStrategy, Component } from '@angular/core'

import { EventsService } from 'src/app/events/services/events.service'

@Component({
	selector: 'app-sidebar-events',
	templateUrl: './sidebar-events.component.html',
	styleUrl: './sidebar-events.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarEventsComponent {
	events$ = this.eventsService.getTeamsEvents({ size: 3, page: 0 })

	constructor(private eventsService: EventsService) {}
}
