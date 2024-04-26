import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'

import dayjs from 'dayjs'

import { TeamsService } from 'src/app/teams/services/teams.service'

import { TasksExportDTO } from '../../../models/tasks-filter.dto'

@Component({
	selector: 'app-tasks-export-dialog',
	templateUrl: './tasks-export-dialog.component.html',
	styleUrl: './tasks-export-dialog.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksExportDialogComponent {
	executors$ = this.teamsService.getAllTeamMembers()
	currentTeamMember$ = this.teamsService.currentTeamMember$
	views: string[] = ['Table']

	form = this.createForm()

	constructor(
		public dialogRef: MatDialogRef<TasksExportDialogComponent>,
		private teamsService: TeamsService,
	) {}

	onBackClick(): void {
		this.dialogRef.close()
	}

	onSubmit() {
		const formValues = this.form.getRawValue()

		const dto: TasksExportDTO = {
			format: 'EXCEL',
			startDate: formValues.startDate ? formValues.startDate.toISOString() : undefined,
			endDate: formValues.endDate ? formValues.endDate.toISOString() : undefined,
			executorId: formValues.executorId ?? undefined,
		}

		this.dialogRef.close(dto)
	}

	private createForm() {
		const currentDate = dayjs()
		const monthBefore = currentDate.subtract(1, 'month')

		return new FormGroup({
			executorId: new FormControl(null, [Validators.required]),
			view: new FormControl(this.views[0], [Validators.required]),
			startDate: new FormControl<Date>(monthBefore.toDate(), [Validators.required]),
			endDate: new FormControl<Date>(currentDate.toDate(), [Validators.required]),
		})
	}
}
