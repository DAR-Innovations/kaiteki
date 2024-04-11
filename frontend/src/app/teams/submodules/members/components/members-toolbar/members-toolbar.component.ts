import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { take } from 'rxjs'

import { TeamsService } from 'src/app/teams/services/teams.service'

import { DashboardInviteDialogComponent } from '../../../dashboard/components/dialogs/dashboard-invite-dialog/dashboard-invite-dialog.component'

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
	) {}

	onAddNewClick(event: Event) {
		event.preventDefault()

		const dialogRef = this.dialog.open(DashboardInviteDialogComponent, {
			minWidth: '30%',
		})

		dialogRef.afterClosed().pipe(take(1)).subscribe()
	}
}
