import { ChangeDetectionStrategy, Component } from '@angular/core'

import { TeamsAnalyticsService } from './../../../services/teams-analytics.service'

@Component({
	selector: 'app-analytics-statistics-list',
	templateUrl: './analytics-statistics-list.component.html',
	styleUrl: './analytics-statistics-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsStatisticsListComponent {
	statistics$ = this.teamsAnalyticsService.getStatistics()

	constructor(private teamsAnalyticsService: TeamsAnalyticsService) {}
}
