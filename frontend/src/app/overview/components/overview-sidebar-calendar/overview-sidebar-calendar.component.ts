import { ChangeDetectionStrategy, Component } from '@angular/core'

import { interval, map, startWith } from 'rxjs'

@Component({
	selector: 'app-overview-sidebar-calendar',
	templateUrl: './overview-sidebar-calendar.component.html',
	styleUrl: './overview-sidebar-calendar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewSidebarCalendarComponent {
	timeSource = interval(60000)
	formattedTime = this.timeSource.pipe(
		startWith(new Date()),
		map(() => new Date()),
	)
}
