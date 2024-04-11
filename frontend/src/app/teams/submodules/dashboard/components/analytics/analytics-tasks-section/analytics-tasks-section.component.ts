import { ChangeDetectionStrategy, Component } from '@angular/core'

import { ChartConfiguration, ChartOptions } from 'chart.js'
import { Observable, map } from 'rxjs'

import { TaskStatusType } from 'src/app/teams/submodules/tasks/models/tasks.model'

import { TeamsAnalyticsService } from '../../../services/teams-analytics.service'

@Component({
	selector: 'app-analytics-tasks-section',
	templateUrl: './analytics-tasks-section.component.html',
	styleUrl: './analytics-tasks-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsTasksSectionComponent {
	completedTasksByExecutor$: Observable<ChartConfiguration<'bar'>['data']> =
		this.teamsAnalyticsService.getTaskCountsByExecutorAndStatus(TaskStatusType.DONE).pipe(
			map(response => ({
				labels: response.labels,
				datasets: [
					{
						data: response.data,
						label: 'Completed tasks by assignees',
						borderRadius: 8,
						backgroundColor: 'rgba(6, 142, 68, 0.8)',
					},
				],
			})),
		)

	inProgressTasksByExecutor$: Observable<ChartConfiguration<'bar'>['data']> =
		this.teamsAnalyticsService.getTaskCountsByExecutorAndStatus(TaskStatusType.REGULAR).pipe(
			map(response => ({
				labels: response.labels,
				datasets: [
					{
						data: response.data,
						label: 'Active tasks by assignees',
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

	constructor(private teamsAnalyticsService: TeamsAnalyticsService) {}
}
