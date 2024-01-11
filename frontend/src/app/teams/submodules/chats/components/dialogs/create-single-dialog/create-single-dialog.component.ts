import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TeamsService } from 'src/app/teams/services/teams.service';
import { CreateChatRoomDTO } from '../../../models/chat-rooms.dto';
import { ChatRoomsType } from '../../../models/chat-rooms.model';

@Component({
  selector: 'app-create-single-dialog',
  templateUrl: './create-single-dialog.component.html',
  styleUrls: ['./create-single-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateSingleDialogComponent {
  form = new FormGroup({
    teamMemberId: new FormControl<number | null>(null, [Validators.required]),
  });

  members$ = this.teamsService.getAllTeamMembersExceptCurrent();

  constructor(
    private dialogRef: MatDialogRef<CreateSingleDialogComponent>,
    private teamsService: TeamsService
  ) {}

  onBackClick() {
    this.dialogRef.close();
  }

  onSubmitClick() {
    const { teamMemberId } = this.form.value;

    const dto: CreateChatRoomDTO = {
      name: '',
      type: ChatRoomsType.DIRECT,
      teamMembersIds: [teamMemberId!],
    };

    this.dialogRef.close(dto);
  }
}
