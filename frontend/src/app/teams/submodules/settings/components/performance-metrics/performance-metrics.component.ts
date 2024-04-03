import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'

import {
	PerformanceMetricsTable,
	PerformanceMetricsTableItem,
} from '../../../performance/models/team-performance.model'
import { NORMAL_VALUE_DESCRIPTION, WEIGHT_DESCRIPTION } from '../../constants/metrics-descriptions'

export interface PerformanceMetricsChange {
	totalValue: number
	metricsItems: PerformanceMetricsTableItem[]
}

@Component({
	selector: 'app-performance-metrics',
	templateUrl: './performance-metrics.component.html',
	styleUrl: './performance-metrics.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerformanceMetricsComponent {
	@Input({ required: true }) set metrics(metrics: PerformanceMetricsTable) {
		this._metrics = Object.entries(metrics).map(([, metric]) => metric)
	}
	@Input({ required: false }) satisfiedTotalValue: number = 100
	@Output() metricsChange = new EventEmitter<PerformanceMetricsChange>()

	private _metrics: PerformanceMetricsTableItem[] = []

	displayedColumns = ['enabled', 'metrics', 'normal', 'percentage']
	weightDescription = WEIGHT_DESCRIPTION
	normalValueDescription = NORMAL_VALUE_DESCRIPTION

	get metrics(): PerformanceMetricsTableItem[] {
		return this._metrics
	}

	get totalValue(): number {
		return Object.entries(this.metrics).reduce(
			(sum, [, metric]) => sum + (metric.enabled ? metric.weight : 0),
			0,
		)
	}

	triggerMetricsChange() {
		this.metricsChange.emit({
			totalValue: this.totalValue,
			metricsItems: this.metrics,
		})
	}

	updateValue(metric: PerformanceMetricsTableItem, newValue: number) {
		metric.enabled = newValue > 0
		metric.weight = newValue

		this.triggerMetricsChange()
	}
}
