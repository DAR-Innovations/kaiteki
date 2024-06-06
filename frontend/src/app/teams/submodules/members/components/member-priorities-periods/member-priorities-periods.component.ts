import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'

import { ChartConfiguration } from 'chart.js'
import { Observable, map, of } from 'rxjs'

import { TeamMembersAnalyticsService } from '../../../analytics/services/members-analytics.service'
import { TaskPriority } from '../../../tasks/models/tasks.model'

@Component({
	selector: 'app-member-priorities-periods',
	templateUrl: './member-priorities-periods.component.html',
	styleUrl: './member-priorities-periods.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberPrioritiesPeriodsComponent implements OnInit {
	@Input() memberId!: number
	highChartData$: Observable<ChartConfiguration<'line'>['data'] | null> = of(null)
	midChartData$: Observable<ChartConfiguration<'line'>['data'] | null> = of(null)
	lowChartData$: Observable<ChartConfiguration<'line'>['data'] | null> = of(null)

	chartOptions: ChartConfiguration<'line'>['options'] = {
		responsive: true,
		maintainAspectRatio: false,
		font: {
			family: 'Poppins, sans-serif',
			size: 14,
		},
	}

	constructor(private membersAnalyticsService: TeamMembersAnalyticsService) {}

	ngOnInit(): void {
		this.highChartData$ = this.membersAnalyticsService
			.getTaskPrioritiesCountsByPeriods(this.memberId, TaskPriority.HIGH)
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

		this.midChartData$ = this.membersAnalyticsService
			.getTaskPrioritiesCountsByPeriods(this.memberId, TaskPriority.MEDIUM)
			.pipe(
				map(response => ({
					labels: response.labels,
					datasets: [
						{
							data: response.data,
							label: 'Count over period',
							borderColor: 'rgba(6, 142, 68, 0.8)',
							backgroundColor: 'rgba(6, 142, 68, 0.4)',
							fill: true,
							tension: 0.5,
						},
					],
				})),
			)

		this.lowChartData$ = this.membersAnalyticsService
			.getTaskPrioritiesCountsByPeriods(this.memberId, TaskPriority.LOW)
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
