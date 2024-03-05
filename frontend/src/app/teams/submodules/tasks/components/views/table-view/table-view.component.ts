import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { Task, TaskPriority, TaskStatus } from '../../../models/tasks.model'

@Component({
	selector: 'app-table-view',
	templateUrl: './table-view.component.html',
	styleUrls: ['./table-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableViewComponent {
	@Input() set columns(cols: TaskStatus[]) {
		for (const column of cols) {
			this.tasks = this.tasks.concat(column.tasks)
		}
	}

	tasks: Task[] = []

	displayedColumns: string[] = [
		'id',
		'title',
		'executor',
		'startDate',
		'endDate',
		'priority',
		'status',
		'actions',
	]

	onTaskMoreClick(e: Event) {
		e.stopPropagation()
	}

	taskPriority(task: Task) {
		switch (task.priority) {
			case TaskPriority.CRITICAL:
				return 'Critical'
			case TaskPriority.HIGH:
				return 'High'
			case TaskPriority.MEDIUM:
				return 'Medium'
			case TaskPriority.LOW:
				return 'Low'
			default:
				return ''
		}
	}
}
