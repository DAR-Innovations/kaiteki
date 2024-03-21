import { ChangeDetectionStrategy, Component } from '@angular/core'

import { EventsBaseViewComponent } from '../events-base-view/events-base-view.component'

@Component({
	selector: 'app-events-month-view',
	templateUrl: './events-month-view.component.html',
	styleUrls: ['./events-month-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsMonthViewComponent extends EventsBaseViewComponent {}
