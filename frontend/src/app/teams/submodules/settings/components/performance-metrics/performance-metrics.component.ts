import { ChangeDetectionStrategy, Component } from '@angular/core'

import { NORMAL_VALUE_DESCRIPTION, WEIGHT_DESCRIPTION } from '../../constants/metrics-descriptions'

interface PerformanceMetricSettings {
	type: PerformanceMetricsType
	name: string
	value: number
	normalValue: number
	description: string
	enabled: boolean
}

enum PerformanceMetricsType {
	HIGH_PRIORITY_TASKS = 'HIGH_PRIORITY_TASKS',
	MEDIUM_PRIORITY_TASKS = 'MEDIUM_PRIORITY_TASKS',
	LOW_PRIORITY_TASKS = 'LOW_PRIORITY_TASKS',
	ATTENDANT_MEETINGS = 'ATTENDANT_MEETINGS',
	SCREEN_TIME_MINUTES = 'SCREEN_TIME_MINUTES',
}

@Component({
	selector: 'app-performance-metrics',
	templateUrl: './performance-metrics.component.html',
	styleUrl: './performance-metrics.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerformanceMetricsComponent {
	metrics: PerformanceMetricSettings[] = [
		{
			type: PerformanceMetricsType.HIGH_PRIORITY_TASKS,
			name: 'High priority tasks',
			description: 'Team member`s completed high priority tasks amount in one month period',
			enabled: true,
			value: 40,
			normalValue: 3,
		},
		{
			type: PerformanceMetricsType.MEDIUM_PRIORITY_TASKS,
			name: 'Medium priority tasks',
			description: 'Team member`s completed medium priority tasks amount in one month period',
			enabled: true,
			value: 30,
			normalValue: 5,
		},
		{
			type: PerformanceMetricsType.LOW_PRIORITY_TASKS,
			name: 'Low priority tasks',
			description: 'Team member`s completed low priority tasks amount in one month period',
			enabled: true,
			value: 10,
			normalValue: 10,
		},
		{
			type: PerformanceMetricsType.ATTENDANT_MEETINGS,
			name: 'Attending meetings',
			description: 'Team member`s attendant meetings amount in one month period',
			enabled: true,
			value: 10,
			normalValue: 8,
		},
		{
			type: PerformanceMetricsType.SCREEN_TIME_MINUTES,
			name: 'Screen time',
			description: 'Team member`s spending time (minutes) on the platform in one month period',
			enabled: true,
			value: 10,
			normalValue: 450,
		},
	]
	displayedColumns = ['enabled', 'metrics', 'normal', 'percentage']
	weightDescription = WEIGHT_DESCRIPTION
	normalValueDescription = NORMAL_VALUE_DESCRIPTION

	totalEnabledValue = 100

	get totalValue(): number {
		return this.metrics.reduce((sum, metric) => sum + (metric.enabled ? metric.value : 0), 0)
	}

	updateValue(metric: PerformanceMetricSettings, newValue: number) {
		const delta = newValue - metric.value

		if (this.isValidChange(delta)) {
			metric.enabled = newValue > 0
			metric.value = newValue
			this.updateRemainingValues(delta)
		}
	}

	isValidChange(delta: number): boolean {
		const totalAfterChange = this.totalValue + delta
		return totalAfterChange >= 0 && totalAfterChange <= this.totalEnabledValue
	}

	updateRemainingValues(delta: number) {
		for (const metric of this.metrics) {
			if (metric.enabled && metric !== this.metrics[this.metrics.indexOf(metric)]) {
				metric.value -= delta / (this.metrics.length - 1)
			}
		}
	}
}
