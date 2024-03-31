import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { EMPTY, catchError, filter, switchMap, take, throwError } from 'rxjs'

import { PRIMARY_SIDEBAR_LINKS } from 'src/app/shared/constants/pages-links'
import { ToastService } from 'src/app/shared/services/toast.service'

import { CreateTeamDialogComponent } from 'src/app/teams/components/dialogs/create-team-dialog/create-team-dialog.component'
import { CreateTeamDTO, Teams } from 'src/app/teams/models/teams.model'
import { TeamsService } from 'src/app/teams/services/teams.service'

import { SidebarService } from '../../services/sidebar.service'

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
	integrations = [{ name: 'Spotify', link: 'spotify' }]
	sidebarPages = Object.entries(PRIMARY_SIDEBAR_LINKS).map(([, value]) => value)
	collapsed$ = this.sidebarService.sidebarCollapsedState
	teams$ = this.teamsService.teams$

	constructor(
		private dialog: MatDialog,
		private teamsService: TeamsService,
		private toastService: ToastService,
		private sidebarService: SidebarService,
	) {}

	onCreateTeam() {
		const dialogRef = this.dialog.open<unknown, unknown, CreateTeamDTO>(CreateTeamDialogComponent, {
			minWidth: '30%',
		})

		dialogRef
			.afterClosed()
			.pipe(
				filter(form => !!form),
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

	teamsTrackBy(index: number, team: Teams) {
		return team.id
	}
}
