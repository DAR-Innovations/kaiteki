import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { catchError, take, throwError } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import { UpdateTeamDTO } from 'src/app/teams/models/teams.model'
import { TeamsService } from 'src/app/teams/services/teams.service'

@Component({
	selector: 'app-settings-rename-section',
	templateUrl: './settings-rename-section.component.html',
	styleUrl: './settings-rename-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsRenameSectionComponent implements OnInit {
	form = new FormGroup({
		name: new FormControl<string>('', [Validators.required]),
		description: new FormControl<string>('', [Validators.required]),
	})

	constructor(
		private teamsService: TeamsService,
		private toastService: ToastService,
	) {}

	ngOnInit(): void {
		this.teamsService.currentTeam$.pipe(take(1)).subscribe(team => {
			if (team) {
				this.form.patchValue({
					name: team.name,
					description: team.description,
				})
			}
		})
	}

	onSubmit() {
		const values = this.form.getRawValue()

		if (!values.name || !values.description) {
			this.toastService.error('Invalid team name or description')
			return
		}

		const dto: UpdateTeamDTO = {
			name: values.name,
			description: values.description,
		}

		this.teamsService
			.updateTeam(dto)
			.pipe(
				catchError(err => {
					this.toastService.error('Failed to update team')
					return throwError(() => err)
				}),
				take(1),
			)
			.subscribe(() => {
				this.toastService.open('Successfully updated team')
				this.teamsService.refetchCurrentTeam()
			})
	}
}
