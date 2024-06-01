import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { catchError, take, throwError } from 'rxjs'

import { FilesService } from 'src/app/core/files/services/files.service'

import { ToastService } from 'src/app/shared/services/toast.service'

import { TeamsService } from 'src/app/teams/services/teams.service'

import { DashboardInviteDialogComponent } from '../../../dashboard/components/dialogs/dashboard-invite-dialog/dashboard-invite-dialog.component'

import { TeamMembersAnalyticsService } from './../../../analytics/services/members-analytics.service'

@Component({
	selector: 'app-members-toolbar',
	templateUrl: './members-toolbar.component.html',
	styleUrl: './members-toolbar.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersToolbarComponent {
	currentTeam$ = this.teamsService.currentTeam$

	constructor(
		private dialog: MatDialog,
		private teamsService: TeamsService,
		private teamMembersAnalyticsService: TeamMembersAnalyticsService,
		private toastService: ToastService,
		private filesService: FilesService,
	) {}

	onAddNewClick(event: Event) {
		event.preventDefault()

		const dialogRef = this.dialog.open(DashboardInviteDialogComponent, {
			minWidth: '30%',
		})

		dialogRef.afterClosed().pipe(take(1)).subscribe()
	}

	onExportClick(e: Event) {
		e.preventDefault()

		this.teamMembersAnalyticsService
			.exportCurrentTeamMembers({})
			.pipe(
				catchError(err => {
					this.toastService.error('Failed to export members')
					return throwError(() => err)
				}),
				take(1),
			)
			.subscribe(blob => {
				this.filesService.downloadBlob(blob)
				this.toastService.open('Successfully exported members')
			})
	}
}
