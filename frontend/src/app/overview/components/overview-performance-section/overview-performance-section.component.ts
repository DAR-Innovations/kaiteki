import { ChangeDetectionStrategy, Component } from '@angular/core'

import { ChartConfiguration } from 'chart.js'
import { Observable, map } from 'rxjs'

import { UsersAnalyticsService } from 'src/app/teams/submodules/analytics/services/users-analytics.service'
import { PerformanceService } from 'src/app/teams/submodules/performance/services/performance.service'

@Component({
	selector: 'app-overview-performance-section',
	templateUrl: './overview-performance-section.component.html',
	styleUrl: './overview-performance-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewPerformanceSectionComponent {
	userPerformance$ = this.performanceService.getLatestUserPerformance().pipe(
		map(userPerformance => {
			return { ...userPerformance, performance: userPerformance.performance * 100 }
		}),
	)

	performanceChartData$: Observable<ChartConfiguration<'line'>['data']> = this.usersAnalyticsService
		.getPerformanceByPeriod()
		.pipe(
			map(response => ({
				labels: response.labels,
				datasets: [
					{
						data: response.data,
						label: 'Performance by period',
						borderColor: 'rgba(6, 142, 68, 0.8)',
						backgroundColor: 'rgba(6, 142, 68, 0.4)',
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
		private performanceService: PerformanceService,
		private usersAnalyticsService: UsersAnalyticsService,
	) {}
}
