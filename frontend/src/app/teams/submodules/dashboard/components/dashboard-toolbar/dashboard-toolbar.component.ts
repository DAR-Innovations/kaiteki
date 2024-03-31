import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { take } from 'rxjs'

import { DashboardInviteDialogComponent } from '../dialogs/dashboard-invite-dialog/dashboard-invite-dialog.component'

@Component({
	selector: 'app-dashboard-toolbar',
	templateUrl: './dashboard-toolbar.component.html',
	styleUrls: ['./dashboard-toolbar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardToolbarComponent {
	constructor(private dialog: MatDialog) {}

	onAddNewClick(event: Event) {
		event.preventDefault()

		const dialogRef = this.dialog.open(DashboardInviteDialogComponent, {
			minWidth: '30%',
		})

		dialogRef.afterClosed().pipe(take(1)).subscribe()
	}
}
