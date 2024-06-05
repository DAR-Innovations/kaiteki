import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { EMPTY, catchError, switchMap, take, throwError } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import { CreateTeamDialogComponent } from 'src/app/teams/components/dialogs/create-team-dialog/create-team-dialog.component'
import { CreateTeamDTO } from 'src/app/teams/models/teams.model'
import { TeamsService } from 'src/app/teams/services/teams.service'

@Component({
	selector: 'app-overview-teams-list',
	templateUrl: './overview-teams-list.component.html',
	styleUrl: './overview-teams-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewTeamsListComponent {
	teams$ = this.teamsService.teams$

	constructor(
		private teamsService: TeamsService,
		private dialog: MatDialog,
		private toastService: ToastService,
	) {}

	onCreateTeam() {
		const dialogRef = this.dialog.open<unknown, unknown, CreateTeamDTO>(CreateTeamDialogComponent, {
			minWidth: '30%',
		})

		dialogRef
			.afterClosed()
			.pipe(
				switchMap(form => {
					if (form) {
						return this.teamsService.createTeam(form)
					}

					return EMPTY
				}),
				catchError(err => {
					this.toastService.open('Failed to create team')
					return throwError(() => err)
				}),
				take(1),
			)
			.subscribe(() => {
				this.toastService.open('Successfully created team')
				this.teamsService.refetchTeams()
			})
	}
}
