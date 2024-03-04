import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { Task } from '../../models/tasks.model'
import { getPriorityString } from '../../utils/get-priority-string.util'

@Component({
	selector: 'app-task-details-sidebar[task]',
	templateUrl: './task-details-sidebar.component.html',
	styleUrls: ['./task-details-sidebar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailsSidebarComponent {
	@Input() task!: Task

	get getPriority() {
		return getPriorityString(this.task.priority)
	}
}
