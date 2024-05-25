import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { EMPTY, catchError, filter, map, switchMap, take, throwError } from 'rxjs'

import { PRIMARY_SIDEBAR_LINKS } from 'src/app/shared/constants/pages-links'
import { ToastService } from 'src/app/shared/services/toast.service'

import { IntegrationsService } from 'src/app/integrations/services/integrations.service'
import { CreateTeamDialogComponent } from 'src/app/teams/components/dialogs/create-team-dialog/create-team-dialog.component'
import { CreateTeamDTO, Teams } from 'src/app/teams/models/teams.model'
import { TeamsService } from 'src/app/teams/services/teams.service'

import { SidebarService } from '../../../../services/sidebar.service'

@Component({
	selector: 'app-sidebar-content',
	templateUrl: './sidebar-content.component.html',
	styleUrl: './sidebar-content.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarContentComponent {
	@Input() enableCollapse: boolean = true

	sidebarPages = Object.entries(PRIMARY_SIDEBAR_LINKS).map(([, value]) => value)
	collapsed$ = this.sidebarService.sidebarCollapsedState
	teams$ = this.teamsService.teams$
	integrations$ = this.integrationsService.integrations$.pipe(
		map(integrations => {
			const activeIntegrations = []
			if (integrations.github && integrations.github.enabled) {
				activeIntegrations.push({ name: 'GitHub', link: 'github' })
			}

			if (integrations.spotify && integrations.spotify.enabled) {
				activeIntegrations.push({ name: 'Spotify', link: 'spotify' })
			}

			if (integrations.telegram && integrations.telegram.enabled) {
				activeIntegrations.push({ name: 'Telegram', link: 'telegram' })
			}

			return activeIntegrations
		}),
	)

	constructor(
		private dialog: MatDialog,
		private teamsService: TeamsService,
		private toastService: ToastService,
		private sidebarService: SidebarService,
		private integrationsService: IntegrationsService,
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
