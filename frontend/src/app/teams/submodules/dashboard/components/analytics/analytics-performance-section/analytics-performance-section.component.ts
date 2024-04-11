import { ChangeDetectionStrategy, Component } from '@angular/core'

import { ChartConfiguration } from 'chart.js'
import { Observable, map } from 'rxjs'

import { PerformanceService } from './../../../../performance/services/performance.service'
import { TeamsAnalyticsService } from './../../../services/teams-analytics.service'

@Component({
	selector: 'app-analytics-performance-section',
	templateUrl: './analytics-performance-section.component.html',
	styleUrl: './analytics-performance-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsPerformanceSectionComponent {
	teamPerformance$ = this.performanceService.getTeamPerformance().pipe(
		map(teamPerformance => {
			return { ...teamPerformance, performance: teamPerformance.performance * 100 }
		}),
	)

	performanceChartData$: Observable<ChartConfiguration<'line'>['data']> = this.teamsAnalyticsService
		.getPerformanceByPeriod()
		.pipe(
			map(response => ({
				labels: response.labels,
				datasets: [
					{
						data: response.data,
						label: 'Performance by period',
						backgroundColor: 'rgba(6, 142, 68, 0.8)',
						fill: true,
						tension: 0.5,
					},
				],
			})),
		)

	performanceChartOptions: ChartConfiguration<'line'>['options'] = {
		responsive: true,
		maintainAspectRatio: false,
		font: {
			family: 'Poppins, sans-serif',
			size: 14,
		},
	}

	constructor(
		private teamsAnalyticsService: TeamsAnalyticsService,
		private performanceService: PerformanceService,
	) {}
}
