import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { Task, TaskPriority, TaskStatus } from 'src/app/teams/submodules/tasks/models/tasks.model'

@Component({
	selector: 'app-list-panel',
	templateUrl: './list-panel.component.html',
	styleUrls: ['./list-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPanelComponent {
	@Input() column: TaskStatus | null = null

	panelOpenState = false
	displayedColumns: string[] = [
		'id',
		'title',
		'executor',
		'startDate',
		'endDate',
		'priority',
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
