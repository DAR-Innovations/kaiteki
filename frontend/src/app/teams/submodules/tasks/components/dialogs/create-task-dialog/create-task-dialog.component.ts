import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

import { QuillModules } from 'ngx-quill'
import { Observable } from 'rxjs'

import { TeamMembersDTO } from 'src/app/teams/models/team-members.model'
import { TeamsService } from 'src/app/teams/services/teams.service'

import { CreateTaskDTO } from '../../../models/create-task.dto'
import { TaskPriority } from '../../../models/tasks.model'
import { TasksService } from '../../../services/tasks.service'

export interface CreateTaskDialogComponentProps {
	statusId?: number
}

@Component({
	selector: 'app-create-task-dialog',
	templateUrl: './create-task-dialog.component.html',
	styleUrls: ['./create-task-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskDialogComponent {
	form: FormGroup = this.createForm()

	executors$: Observable<TeamMembersDTO[]> =
		this.teamsSevice.getAllTeamMembers()

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
		public dialogRef: MatDialogRef<CreateTaskDialogComponent>,
		private teamsSevice: TeamsService,
		private tasksService: TasksService,
		@Inject(MAT_DIALOG_DATA) public data: CreateTaskDialogComponentProps
	) {
		this.patchInitialValues()
	}

	onBackClick(): void {
		this.dialogRef.close()
	}

	onSubmit() {
		const formValues = this.form.getRawValue()

		const dto: CreateTaskDTO = {
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

	private patchInitialValues() {
		this.form.patchValue({
			statusId: this.data.statusId,
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
