import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
	selector: 'app-dashboard-analytics',
	templateUrl: './dashboard-analytics.component.html',
	styleUrl: './dashboard-analytics.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardAnalyticsComponent {}
