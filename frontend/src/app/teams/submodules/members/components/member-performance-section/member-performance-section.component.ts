import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'

import { ChartConfiguration } from 'chart.js'
import { Observable, map, of } from 'rxjs'

import { TeamMemberPerformance } from '../../../performance/models/member-performance.model'
import { PerformanceService } from '../../../performance/services/performance.service'

import { TeamMembersAnalyticsService } from './../../../analytics/services/members-analytics.service'

@Component({
	selector: 'app-member-performance-section[memberId]',
	templateUrl: './member-performance-section.component.html',
	styleUrl: './member-performance-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberPerformanceSectionComponent implements OnInit {
	@Input() memberId!: number

	memberPerformance$: Observable<TeamMemberPerformance | null> = of(null)
	performanceChartData$: Observable<ChartConfiguration<'line'>['data'] | null> = of(null)

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
		private membersAnalyticsService: TeamMembersAnalyticsService,
	) {}

	ngOnInit(): void {
		this.memberPerformance$ = this.performanceService.getTeamMemberPerformance(this.memberId).pipe(
			map(userPerformance => {
				return { ...userPerformance, performance: userPerformance.performance * 100 }
			}),
		)

		this.performanceChartData$ = this.membersAnalyticsService
			.getPerformanceByPeriod(this.memberId)
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
	}
}
