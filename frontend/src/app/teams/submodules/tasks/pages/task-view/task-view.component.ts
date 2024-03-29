import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { catchError, finalize, take, throwError } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import { Task } from '../../models/tasks.model'

import { TasksService } from './../../services/tasks.service'

@Component({
	selector: 'app-task-view-page',
	templateUrl: './task-view.component.html',
	styleUrls: ['./task-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskViewComponent {
	isError = false
	task: Task | null = null

	constructor(
		private route: ActivatedRoute,
		private tasksService: TasksService,
		private toastService: ToastService,
		private cd: ChangeDetectorRef,
	) {
		this.getTaskByUrl()
	}

	getTaskByUrl() {
		const id = this.route.snapshot.paramMap.get('taskId')
		const numberedId = Number(id)

		if (isNaN(numberedId)) {
			this.toastService.error('The task id is invalid')
			return
		}

		this.tasksService
			.getTaskById(numberedId)
			.pipe(
				catchError(err => {
					this.toastService.error('Failed to load task')
					this.isError = true
					return throwError(() => err)
				}),
				finalize(() => {
					this.cd.markForCheck()
				}),
				take(1),
			)
			.subscribe(task => {
				this.task = task
			})
	}
}
