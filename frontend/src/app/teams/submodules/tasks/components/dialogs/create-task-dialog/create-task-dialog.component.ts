import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

import { QuillModules } from 'ngx-quill'
import { Observable, catchError, take, throwError } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import { KaizenAPIService } from 'src/app/kaizen/services/kaizen-api.service'
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
	form = this.createForm()

	executors$: Observable<TeamMembersDTO[]> = this.teamsService.getAllTeamMembers()

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
		private teamsService: TeamsService,
		private tasksService: TasksService,
		private toastService: ToastService,
		private kaizenApiService: KaizenAPIService,
		@Inject(MAT_DIALOG_DATA) public data: CreateTaskDialogComponentProps,
	) {
		this.patchInitialValues()
	}

	onBackClick(): void {
		this.dialogRef.close()
	}

	onSubmit() {
		const formValues = this.form.getRawValue()

		const dto: CreateTaskDTO = {
			title: formValues.title!,
			content: formValues.content || undefined,
			tag: formValues.tag!,
			description: formValues.description!,
			endDate: formValues.endDate?.toISOString(),
			startDate: formValues.startDate?.toISOString(),
			priority: formValues.priority!,
			statusId: formValues.statusId!,
			executorId: formValues.executorId || undefined,
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
			title: new FormControl<string | null>(null, [Validators.required]),
			description: new FormControl<string | null>(null, [Validators.required]),
			tag: new FormControl<string | null>(null, [Validators.required]),
			content: new FormControl<string | null>(null, []),
			statusId: new FormControl<number | null>(null, [Validators.required]),
			priority: new FormControl(TaskPriority.MEDIUM, [Validators.required]),
			executorId: new FormControl<number | null>(null, []),
			startDate: new FormControl<Date>(new Date()),
			endDate: new FormControl<Date | null>(null, []),
		})
	}

	onWriteAIClick(event: Event) {
		event.preventDefault()

		const { title, description } = this.form.value

		if (!title) {
			this.toastService.error('Provide the title field')
			return
		}

		if (!description) {
			this.toastService.error('Provide the description field')
			return
		}

		this.kaizenApiService
			.getTaskGuide({ title, description })
			.pipe(
				catchError(err => {
					this.toastService.error('Failed to generate task content with AI')
					return throwError(() => err)
				}),
				take(1),
			)
			.subscribe(res => {
				console.log(res)
			})
	}
}
