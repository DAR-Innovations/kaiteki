import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'

import { TeamsService } from 'src/app/teams/services/teams.service'

import { CreateChatRoomDTO } from '../../../models/chat-rooms.dto'
import { ChatRoomsType } from '../../../models/chat-rooms.model'

@Component({
	selector: 'app-create-group-dialog',
	templateUrl: './create-group-dialog.component.html',
	styleUrls: ['./create-group-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateGroupDialogComponent {
	form = new FormGroup({
		name: new FormControl<string>('', [Validators.required]),
		teamMembersIds: new FormControl<number[]>([], [Validators.required]),
	})

	members$ = this.teamsService.getAllTeamMembersExceptCurrent()

	constructor(
		private dialogRef: MatDialogRef<CreateGroupDialogComponent>,
		private teamsService: TeamsService
	) {}

	onBackClick() {
		this.dialogRef.close()
	}

	onSubmitClick() {
		const { name, teamMembersIds } = this.form.value

		const dto: CreateChatRoomDTO = {
			name: name!,
			type: ChatRoomsType.GROUP,
			teamMembersIds: teamMembersIds!,
		}

		this.dialogRef.close(dto)
	}
}
