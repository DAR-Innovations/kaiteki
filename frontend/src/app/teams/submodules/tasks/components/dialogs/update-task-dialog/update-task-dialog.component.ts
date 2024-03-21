import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

import { QuillModules } from 'ngx-quill'

import { TeamsService } from 'src/app/teams/services/teams.service'

import { Task, TaskPriority } from '../../../models/tasks.model'
import { UpdateTaskDTO } from '../../../models/update-task.dto'
import { TasksService } from '../../../services/tasks.service'

export interface UpdateTaskDialogComponentProps {
	task: Task
}

@Component({
	selector: 'app-update-task-dialog',
	templateUrl: './update-task-dialog.component.html',
	styleUrls: ['./update-task-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateTaskDialogComponent {
	form: FormGroup = this.createForm()
	executors$ = this.teamsService.getAllTeamMembers()
	statuses$ = this.tasksService.getStatusesWithoutTasks()

	quillConfig: QuillModules = {
		history: true,
		toolbar: {
			container: [
				[{ header: [1, 2, 3, 4, 5, 6, false] }],
				['bold', 'italic', 'underline', 'strike'],
				[{ align: [] }],
				[{ list: 'ordered' }, { list: 'bullet' }],
				[{ color: [] }, { background: [] }],
				['link'],
				['clean'],
			],
		},
	}

	constructor(
		public dialogRef: MatDialogRef<UpdateTaskDialogComponent>,
		private teamsService: TeamsService,
		private tasksService: TasksService,
		@Inject(MAT_DIALOG_DATA) public data: UpdateTaskDialogComponentProps
	) {
		this.patchExistingValues()
	}

	onBackClick(): void {
		this.dialogRef.close()
	}

	onSubmit() {
		const formValues = this.form.getRawValue()

		const dto: UpdateTaskDTO = {
			title: formValues.title,
			content: formValues.content,
			tag: formValues.tag,
			description: formValues.description,
			endDate: formValues.endDate,
			startDate: formValues.startDate,
			priority: formValues.priority,
			statusId: formValues.statusId,
			executorId: formValues.executorId,
		}

		this.dialogRef.close(dto)
	}

	private patchExistingValues() {
		const task = this.data.task

		this.form.patchValue({
			title: task.title,
			description: task.description,
			tag: task.tag,
			content: task.content,
			statusId: task.status.id,
			priority: task.priority,
			executorId: task.executorMember?.id,
			startDate: task.startDate,
			endDate: task.endDate,
		})
	}

	private createForm() {
		return new FormGroup({
			title: new FormControl('', [Validators.required]),
			description: new FormControl('', [Validators.required]),
			tag: new FormControl('', [Validators.required]),
			content: new FormControl('', []),
			statusId: new FormControl(null, [Validators.required]),
			priority: new FormControl(TaskPriority.MEDIUM, [Validators.required]),
			executorId: new FormControl(null, []),
			startDate: new FormControl(new Date()),
			endDate: new FormControl(null, []),
		})
	}
}
