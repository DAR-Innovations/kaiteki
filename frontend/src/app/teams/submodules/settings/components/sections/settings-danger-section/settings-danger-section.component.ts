import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Router } from '@angular/router'

import { catchError, take, throwError } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import { TeamsService } from './../../../../../services/teams.service'

@Component({
	selector: 'app-settings-danger-section',
	templateUrl: './settings-danger-section.component.html',
	styleUrl: './settings-danger-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsDangerSectionComponent {
	constructor(
		private teamsService: TeamsService,
		private toastService: ToastService,
		private router: Router,
	) {}

	onTeamDelete() {
		if (!confirm('Do you really want to delete this team?')) {
			return
		}

		this.teamsService
			.deleteTeam()
			.pipe(
				catchError(err => {
					this.toastService.error('Failed to delete team')
					return throwError(() => err)
				}),
				take(1),
			)
			.subscribe(() => {
				this.teamsService.setCurrentTeam(null)
				this.teamsService.refetchTeams()
				this.toastService.open('Successfully deleted a team')
				this.router.navigate(['/hub/overview'])
			})
	}
}
