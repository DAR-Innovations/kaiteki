import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TeamsService } from 'src/app/teams/services/teams.service';
import { UpdateChatRoomDTO } from '../../../models/chat-rooms.dto';
import { ChatRooms } from '../../../models/chat-rooms.model';

export interface UpdateChatDialogComponentProps {
  chat: ChatRooms;
}

@Component({
  selector: 'app-update-chat-dialog',
  templateUrl: './update-chat-dialog.component.html',
  styleUrls: ['./update-chat-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateChatDialogComponent {
  form = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    teamMembersIds: new FormControl<number[]>([], [Validators.required]),
  });

  members$ = this.teamsService.getAllTeamMembersExceptCurrent();

  constructor(
    private dialogRef: MatDialogRef<UpdateChatDialogComponent>,
    private teamsService: TeamsService,
    @Inject(MAT_DIALOG_DATA) public data: UpdateChatDialogComponentProps
  ) {
    this.patchExistingValues();
  }

  onBackClick() {
    this.dialogRef.close();
  }

  onSubmitClick() {
    const { name, teamMembersIds } = this.form.value;

    const dto: UpdateChatRoomDTO = {
      name: name!,
      teamMembersIds: teamMembersIds!,
    };

    this.dialogRef.close(dto);
  }

  private patchExistingValues() {
    const chat = this.data.chat;

    this.form.patchValue({
      name: chat.name,
      teamMembersIds: chat.membersIds,
    });
  }
}
