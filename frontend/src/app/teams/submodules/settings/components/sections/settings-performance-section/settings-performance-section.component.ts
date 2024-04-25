import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core'

import dayjs from 'dayjs'
import { catchError, map, take, tap, throwError } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import {
	PerformanceMetricsTable,
	PerformanceMetricsTableItem,
	PerformanceMetricsType,
	UpdateTeamPerformanceMetricsDTO,
} from 'src/app/teams/submodules/performance/models/team-performance.model'

import { PerformanceMetricsChange } from '../../performance-metrics/performance-metrics.component'

import { PerformanceService } from './../../../../performance/services/performance.service'

@Component({
	selector: 'app-settings-performance-section',
	templateUrl: './settings-performance-section.component.html',
	styleUrl: './settings-performance-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPerformanceSectionComponent implements OnInit {
	metrics: PerformanceMetricsTable | null = null
	satisfiedTotalValue = 100
	totalValue = 100
	lastUpdatedDate: Date | null = null

	constructor(
		private performanceService: PerformanceService,
		private toastService: ToastService,
		private cd: ChangeDetectorRef,
	) {}

	ngOnInit() {
		this.loadMetrics()
	}

	get isDisabled() {
		const periodAgo = dayjs().subtract(3, 'days')
		const isUpdated =
			this.lastUpdatedDate !== null && dayjs(this.lastUpdatedDate).isAfter(periodAgo)

		return this.totalValue !== this.satisfiedTotalValue || isUpdated
	}

	private loadMetrics() {
		this.performanceService
			.getMetrics()
			.pipe(
				tap(metrics => {
					this.lastUpdatedDate = metrics.updatedDate ?? null
					this.cd.markForCheck()
				}),
				map(metrics => {
					const mappedMetrics: PerformanceMetricsTable = {
						HIGH_PRIORITY_TASKS: {
							type: PerformanceMetricsType.HIGH_PRIORITY_TASKS,
							name: 'High priority tasks',
							description: 'Team member`s completed high priority tasks amount in one month period',
							enabled: metrics.highPriorityTasks.enabled,
							weight: metrics.highPriorityTasks.weight * 100,
							normalValue: metrics.highPriorityTasks.normalValue,
						},
						MEDIUM_PRIORITY_TASKS: {
							type: PerformanceMetricsType.MEDIUM_PRIORITY_TASKS,
							name: 'Medium priority tasks',
							description:
								'Team member`s completed medium priority tasks amount in one month period',
							enabled: metrics.mediumPriorityTasks.enabled,
							weight: metrics.mediumPriorityTasks.weight * 100,
							normalValue: metrics.mediumPriorityTasks.normalValue,
						},
						LOW_PRIORITY_TASKS: {
							type: PerformanceMetricsType.LOW_PRIORITY_TASKS,
							name: 'Low priority tasks',
							description: 'Team member`s completed low priority tasks amount in one month period',
							enabled: metrics.lowPriorityTasks.enabled,
							weight: metrics.lowPriorityTasks.weight * 100,
							normalValue: metrics.lowPriorityTasks.normalValue,
						},
						ATTENDANT_MEETINGS: {
							type: PerformanceMetricsType.ATTENDANT_MEETINGS,
							name: 'Attending meetings',
							description: 'Team member`s attendant meetings amount in one month period',
							enabled: metrics.attendantMeetings.enabled,
							weight: metrics.attendantMeetings.weight * 100,
							normalValue: metrics.attendantMeetings.normalValue,
						},
						SCREEN_TIME_MINUTES: {
							type: PerformanceMetricsType.SCREEN_TIME_MINUTES,
							name: 'Screen time minutes',
							description:
								'Team member`s spending time (minutes) on the platform in one month period',
							enabled: metrics.screenTimeMinutes.enabled,
							weight: metrics.screenTimeMinutes.weight * 100,
							normalValue: metrics.screenTimeMinutes.normalValue,
						},
					}

					return mappedMetrics
				}),
				catchError(err => {
					this.toastService.error('Failed to get metrics')
					return throwError(() => err)
				}),
				take(1),
			)
			.subscribe(m => {
				this.metrics = m
				this.cd.markForCheck()
			})
	}

	onPerformanceChange(dto: PerformanceMetricsChange) {
		this.totalValue = dto.totalValue
		this.metrics = this.convertToTable(dto.metricsItems)
		this.cd.markForCheck()
	}

	onSaveClick() {
		if (this.satisfiedTotalValue !== this.totalValue) {
			this.toastService.error(`Total value of enabled metrics must be ${this.satisfiedTotalValue}%`)
			return
		}

		if (!this.metrics) {
			this.toastService.error('Metrics not available')
			return
		}

		const dto: UpdateTeamPerformanceMetricsDTO = this.convertToUpdateDTO(this.metrics)

		this.performanceService
			.updateMetrics(dto)
			.pipe(
				catchError(err => {
					this.toastService.error('Failed to update metrics')
					return throwError(() => err)
				}),
				take(1),
			)
			.subscribe(() => {
				this.toastService.open('Successfully updated performance metrics')
			})
	}

	private convertToTable(metrics: PerformanceMetricsTableItem[]) {
		const highPriorityTasks = metrics.find(
			m => m.type === PerformanceMetricsType.HIGH_PRIORITY_TASKS,
		)
		const mediumPriorityTasks = metrics.find(
			m => m.type === PerformanceMetricsType.MEDIUM_PRIORITY_TASKS,
		)
		const lowPriorityTasks = metrics.find(m => m.type === PerformanceMetricsType.LOW_PRIORITY_TASKS)
		const attendantMeetings = metrics.find(
			m => m.type === PerformanceMetricsType.ATTENDANT_MEETINGS,
		)
		const screenTimeMinutes = metrics.find(
			m => m.type === PerformanceMetricsType.SCREEN_TIME_MINUTES,
		)

		if (
			!highPriorityTasks ||
			!mediumPriorityTasks ||
			!lowPriorityTasks ||
			!attendantMeetings ||
			!screenTimeMinutes
		) {
			return null
		}

		const dto: PerformanceMetricsTable = {
			HIGH_PRIORITY_TASKS: highPriorityTasks,
			MEDIUM_PRIORITY_TASKS: mediumPriorityTasks,
			LOW_PRIORITY_TASKS: lowPriorityTasks,
			ATTENDANT_MEETINGS: attendantMeetings,
			SCREEN_TIME_MINUTES: screenTimeMinutes,
		}

		return dto
	}

	private convertToUpdateDTO(metrics: PerformanceMetricsTable) {
		const dto: UpdateTeamPerformanceMetricsDTO = {
			highPriorityTasks: {
				enabled: metrics.HIGH_PRIORITY_TASKS.enabled,
				weight: metrics.HIGH_PRIORITY_TASKS.weight / 100,
				normalValue: metrics.HIGH_PRIORITY_TASKS.normalValue,
				type: metrics.HIGH_PRIORITY_TASKS.type,
			},
			mediumPriorityTasks: {
				enabled: metrics.MEDIUM_PRIORITY_TASKS.enabled,
				weight: metrics.MEDIUM_PRIORITY_TASKS.weight / 100,
				normalValue: metrics.MEDIUM_PRIORITY_TASKS.normalValue,
				type: metrics.MEDIUM_PRIORITY_TASKS.type,
			},
			lowPriorityTasks: {
				enabled: metrics.LOW_PRIORITY_TASKS.enabled,
				weight: metrics.LOW_PRIORITY_TASKS.weight / 100,
				normalValue: metrics.LOW_PRIORITY_TASKS.normalValue,
				type: metrics.LOW_PRIORITY_TASKS.type,
			},
			attendantMeetings: {
				enabled: metrics.ATTENDANT_MEETINGS.enabled,
				weight: metrics.ATTENDANT_MEETINGS.weight / 100,
				normalValue: metrics.ATTENDANT_MEETINGS.normalValue,
				type: metrics.ATTENDANT_MEETINGS.type,
			},
			screenTimeMinutes: {
				enabled: metrics.SCREEN_TIME_MINUTES.enabled,
				weight: metrics.SCREEN_TIME_MINUTES.weight / 100,
				normalValue: metrics.SCREEN_TIME_MINUTES.normalValue,
				type: metrics.SCREEN_TIME_MINUTES.type,
			},
		}

		return dto
	}
}
