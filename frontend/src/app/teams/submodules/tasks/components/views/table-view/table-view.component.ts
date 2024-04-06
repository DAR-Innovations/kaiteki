import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { Task, TaskPriority, TaskStatus } from '../../../models/tasks.model'
import { TasksBaseViewComponent } from '../tasks-base-view/tasks-base-view.component'

@Component({
	selector: 'app-table-view',
	templateUrl: './table-view.component.html',
	styleUrls: ['./table-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableViewComponent extends TasksBaseViewComponent {
	@Input() override set columns(cols: TaskStatus[]) {
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
