import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Input,
	OnInit,
} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { Observable, catchError, of, take, throwError } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import { CreateTaskNotesDTO, TaskNotesDTO } from '../../models/task-notes.dto'
import { Task } from '../../models/tasks.model'
import { TasksService } from '../../services/tasks.service'

@Component({
	selector: 'app-task-notes[task]',
	templateUrl: './task-notes.component.html',
	styleUrls: ['./task-notes.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskNotesComponent implements OnInit {
	@Input() task!: Task
	taskNotes$: Observable<TaskNotesDTO[]> = of([])
	isEditable: boolean = false

	form = new FormGroup({
		content: new FormControl('', [Validators.required]),
	})

	constructor(
		private tasksService: TasksService,
		private toastrService: ToastService,
		private cd: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this.taskNotes$ = this.tasksService.getTaskNotes(this.task.id)
	}

	createNote() {
		const formValues = this.form.getRawValue()

		if (this.form.invalid || !formValues.content) {
			this.toastrService.error('Form is invalid')
			return
		}

		const dto: CreateTaskNotesDTO = {
			content: formValues.content,
		}

		this.tasksService
			.createTaskNote(this.task.id, dto)
			.pipe(
				catchError(err => {
					this.toastrService.error('Failed to create task note')
					return throwError(() => err)
				}),
				take(1)
			)
			.subscribe(() => {
				this.taskNotes$ = this.tasksService.getTaskNotes(this.task.id)
				this.form.patchValue({ content: '' })
				this.cd.markForCheck()
			})
	}

	deleteNote(noteId: number) {
		this.tasksService
			.deleteTaskNote(noteId)
			.pipe(
				catchError(err => {
					this.toastrService.error('Failed to delete task note')
					return throwError(() => err)
				}),
				take(1)
			)
			.subscribe(() => {
				this.taskNotes$ = this.tasksService.getTaskNotes(this.task.id)
				this.cd.markForCheck()
			})
	}
}
