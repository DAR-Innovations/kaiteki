import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'

import { ToastService } from 'src/app/shared/services/toast.service'

import { TeamsService } from 'src/app/teams/services/teams.service'

import { CreateChatRoomDTO } from '../../../models/chat-rooms.dto'
import { ChatRoomsType } from '../../../models/chat-rooms.model'

@Component({
	selector: 'app-create-single-dialog',
	templateUrl: './create-single-dialog.component.html',
	styleUrls: ['./create-single-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateSingleDialogComponent {
	form = new FormGroup({
		teamMemberId: new FormControl<number | null>(null, [Validators.required]),
	})

	members$ = this.teamsService.getAllTeamMembersExceptCurrent()

	constructor(
		private dialogRef: MatDialogRef<CreateSingleDialogComponent>,
		private teamsService: TeamsService,
		private toastService: ToastService,
	) {}

	onBackClick() {
		this.dialogRef.close()
	}

	onSubmitClick() {
		const { teamMemberId } = this.form.getRawValue()

		if (!teamMemberId) {
			this.toastService.error('Missing team member id')
			return
		}

		const dto: CreateChatRoomDTO = {
			name: '',
			type: ChatRoomsType.DIRECT,
			teamMembersIds: [teamMemberId],
		}

		this.dialogRef.close(dto)
	}
}
