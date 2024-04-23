import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { EMPTY, catchError, switchMap, take, throwError } from 'rxjs'

import { FilesService } from 'src/app/core/files/services/files.service'

import { ToastService } from 'src/app/shared/services/toast.service'

import { CreateTaskDTO } from '../../models/create-task.dto'
import { SaveTaskStatusDTO } from '../../models/customize-task.dto'
import { TasksExportDTO } from '../../models/tasks-filter.dto'
import { CreateTaskDialogComponent } from '../dialogs/create-task-dialog/create-task-dialog.component'
import { CustomizeDialogComponent } from '../dialogs/customize-dialog/customize-dialog.component'
import { TasksExportDialogComponent } from '../dialogs/tasks-export-dialog/tasks-export-dialog.component'

import { TasksService } from './../../services/tasks.service'

@Component({
	selector: 'app-tasks-toolbar',
	templateUrl: './tasks-toolbar.component.html',
	styleUrls: ['./tasks-toolbar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksToolbarComponent {
	constructor(
		public dialog: MatDialog,
		private tasksService: TasksService,
		private toastService: ToastService,
		private filesService: FilesService,
	) {}

	onAddNewClick(event: Event) {
		event.stopPropagation()

		const dialogRef = this.dialog.open<unknown, unknown, CreateTaskDTO>(CreateTaskDialogComponent, {
			minWidth: '70%',
			data: {},
		})

		dialogRef
			.afterClosed()
			.pipe(
				switchMap(value => {
					if (value) {
						return this.tasksService.createTask(value)
					}
					return EMPTY
				}),
				catchError(err => {
					this.toastService.open('Failed to create a task')
					return throwError(() => err)
				}),
				take(1),
			)
			.subscribe(() => {
				this.toastService.open('Successfully created task')
				this.tasksService.refetchTasks()
			})
	}

	onCustomizeClick() {
		const dialogRef = this.dialog.open<unknown, unknown, SaveTaskStatusDTO[]>(
			CustomizeDialogComponent,
			{
				minWidth: '30%',
			},
		)

		dialogRef
			.afterClosed()
			.pipe(
				switchMap(value => {
					if (value) {
						return this.tasksService.saveCustomizeStatuses(value)
					}
					return EMPTY
				}),
				catchError(err => {
					this.toastService.open('Failed to save statuses')
					return throwError(() => err)
				}),
				take(1),
			)
			.subscribe(() => {
				this.toastService.open('Successfully saved statuses')
				this.tasksService.refetchTasks()
			})
	}

	onExportClick() {
		const dialogRef = this.dialog.open<unknown, unknown, TasksExportDTO>(
			TasksExportDialogComponent,
			{
				minWidth: '30%',
			},
		)

		dialogRef
			.afterClosed()
			.pipe(
				switchMap(value => {
					if (value) {
						return this.tasksService.exportTasks(value)
					}
					return EMPTY
				}),
				catchError(err => {
					this.toastService.error('Failed to export the tasks')
					return throwError(() => err)
				}),
				take(1),
			)
			.subscribe(blob => {
				this.filesService.downloadBlob(blob)

				this.toastService.open('Successfully exported the tasks')
				this.tasksService.refetchTasks()
			})
	}
}
