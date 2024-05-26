import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { catchError, take, throwError } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import { Task, TaskPriority, TaskStatus } from '../../../models/tasks.model'
import { TasksService } from '../../../services/tasks.service'
import { TasksBaseViewComponent } from '../tasks-base-view/tasks-base-view.component'

@Component({
	selector: 'app-table-view',
	templateUrl: './table-view.component.html',
	styleUrls: ['./table-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableViewComponent extends TasksBaseViewComponent {
	@Input() override set columns(cols: TaskStatus[]) {
		this.tasks = cols.flatMap(col => col.tasks)
	}

	tasks: Task[] = []

	displayedColumns: string[] = [
		'checkbox',
		'title',
		'executor',
		'priority',
		'startDate',
		'endDate',
		'status',
		'actions',
	]

	constructor(
		private tasksService: TasksService,
		private toastrService: ToastService,
	) {
		super()
	}

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

	completeTask(task: Task, event: Event) {
		event.stopPropagation()
		this.tasksService
			.toggleCompleteTask(task.id)
			.pipe(
				catchError(err => {
					this.toastrService.error('Failed to complete task.')
					return throwError(() => err)
				}),
				take(1),
			)
			.subscribe(() => {
				this.tasksService.refetchTasks()
			})
	}
}
