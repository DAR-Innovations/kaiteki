import { ChangeDetectionStrategy, Component } from '@angular/core'

import { EventsBaseViewComponent } from '../events-base-view/events-base-view.component'

@Component({
	selector: 'app-events-day-view',
	templateUrl: './events-day-view.component.html',
	styleUrls: ['./events-day-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsDayViewComponent extends EventsBaseViewComponent {}
