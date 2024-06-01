import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'

import { ChartConfiguration, ChartOptions } from 'chart.js'
import { Observable, map, of } from 'rxjs'

import { UserTotalsStatisticsDTO } from '../../../analytics/models/analytics.dto'
import { TeamMembersAnalyticsService } from '../../../analytics/services/members-analytics.service'

@Component({
	selector: 'app-member-tasks-section',
	templateUrl: './member-tasks-section.component.html',
	styleUrl: './member-tasks-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberTasksSectionComponent implements OnInit {
	@Input() memberId!: number

	tasksAnalytics$: Observable<UserTotalsStatisticsDTO | null> = of(null)
	tasksCountByPriority$: Observable<ChartConfiguration<'bar'>['data'] | null> = of(null)

	barChartOptions: ChartOptions<'bar'> = {
		responsive: true,
		maintainAspectRatio: false,
		font: {
			family: 'Poppins, sans-serif',
			size: 14,
		},
	}

	constructor(private membersAnalyticsService: TeamMembersAnalyticsService) {}

	ngOnInit(): void {
		this.tasksAnalytics$ = this.membersAnalyticsService.getStatistics(this.memberId)
		this.tasksCountByPriority$ = this.membersAnalyticsService
			.getTasksCountByPriority(this.memberId)
			.pipe(
				map(response => ({
					labels: response.labels,
					datasets: [
						{
							data: response.data,
							label: 'Tasks count by status',
							borderRadius: 8,
							backgroundColor: 'rgba(6, 142, 68, 0.8)',
						},
					],
				})),
			)
	}
}
