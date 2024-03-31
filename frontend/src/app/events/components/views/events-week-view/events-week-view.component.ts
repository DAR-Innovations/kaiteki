import { ChangeDetectionStrategy, Component } from '@angular/core'

import { EventsBaseViewComponent } from '../events-base-view/events-base-view.component'

@Component({
	selector: 'app-events-week-view',
	templateUrl: './events-week-view.component.html',
	styleUrls: ['./events-week-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsWeekViewComponent extends EventsBaseViewComponent {}
