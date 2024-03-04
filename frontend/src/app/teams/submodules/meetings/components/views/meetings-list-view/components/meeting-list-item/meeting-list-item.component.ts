import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { MeetingsDTO } from 'src/app/teams/submodules/meetings/models/meetings.types'

import { MeetingsSelectedDialogComponent } from '../../../../dialogs/meetings-selected-dialog/meetings-selected-dialog.component'

@Component({
	selector: 'app-meeting-list-item[meeting]',
	templateUrl: './meeting-list-item.component.html',
	styleUrls: ['./meeting-list-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingListItemComponent {
	@Input() meeting!: MeetingsDTO

	constructor(private dialog: MatDialog) {}

	onSelectMeeting(meeting: any) {
		const dialogRef = this.dialog.open(MeetingsSelectedDialogComponent, {
			minWidth: '30%',
			data: { selectedMeeting: meeting },
		})

		dialogRef.afterClosed().subscribe(result => {})
	}
}
