import { ChangeDetectionStrategy, Component } from '@angular/core'

import { ChartConfiguration, ChartOptions } from 'chart.js'
import { Observable, map } from 'rxjs'

import { UsersAnalyticsService } from 'src/app/teams/submodules/analytics/services/users-analytics.service'

@Component({
	selector: 'app-overview-tasks-section',
	templateUrl: './overview-tasks-section.component.html',
	styleUrl: './overview-tasks-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewTasksSectionComponent {
	tasksAnalytics$ = this.usersAnalyticsService.getStatistics()

	completedTasksByTeams$: Observable<ChartConfiguration<'bar'>['data']> = this.usersAnalyticsService
		.getTasksCountByTeams()
		.pipe(
			map(response => ({
				labels: response.labels,
				datasets: [
					{
						data: response.data,
						label: 'Active tasks by teams',
						borderRadius: 8,
						backgroundColor: 'rgba(6, 142, 68, 0.8)',
					},
				],
			})),
		)

	barChartOptions: ChartOptions<'bar'> = {
		responsive: true,
		maintainAspectRatio: false,
		font: {
			family: 'Poppins, sans-serif',
			size: 14,
		},
	}

	constructor(private usersAnalyticsService: UsersAnalyticsService) {}
}
