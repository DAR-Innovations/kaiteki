import { Clipboard } from '@angular/cdk/clipboard'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'

import { take } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import { TeamsService } from './../../../../../services/teams.service'

@Component({
	selector: 'app-dashboard-invite-dialog',
	templateUrl: './dashboard-invite-dialog.component.html',
	styleUrls: ['./dashboard-invite-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardInviteDialogComponent {
	invitationLink$ = this.teamsService.getTeamInvitation()

	constructor(
		private dialogRef: MatDialogRef<DashboardInviteDialogComponent>,
		private teamsService: TeamsService,
		private toastService: ToastService,
		private clipboard: Clipboard,
	) {}

	onCloseClick() {
		this.dialogRef.close()
	}

	onCopyLinkClick() {
		this.invitationLink$.pipe(take(1)).subscribe(invitation => {
			this.clipboard.copy(invitation.link)
			this.toastService.open('Successfully copied link')
		})
	}
}
