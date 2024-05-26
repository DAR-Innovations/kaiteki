import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { catchError, take, throwError } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import { Task, TaskPriority, TaskStatus } from 'src/app/teams/submodules/tasks/models/tasks.model'
import { TasksService } from 'src/app/teams/submodules/tasks/services/tasks.service'

@Component({
	selector: 'app-list-panel',
	templateUrl: './list-panel.component.html',
	styleUrls: ['./list-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPanelComponent {
	@Input() column: TaskStatus | null = null

	panelOpenState = true
	displayedColumns: string[] = [
		'status',
		'title',
		'executor',
		'priority',
		'startDate',
		'endDate',
		'actions',
	]

	constructor(
		private tasksService: TasksService,
		private toastrService: ToastService,
	) {}

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
