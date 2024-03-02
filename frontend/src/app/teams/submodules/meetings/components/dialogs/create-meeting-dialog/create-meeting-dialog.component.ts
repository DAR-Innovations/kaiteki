import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateMeetingDTO } from '../../../models/meetings.dto';
import { TeamsService } from 'src/app/teams/services/teams.service';

export interface CreateMeetingDialogComponentProps {}

@Component({
  selector: 'app-create-meeting-dialog',
  templateUrl: './create-meeting-dialog.component.html',
  styleUrls: ['./create-meeting-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMeetingDialogComponent {
  form = this.createForm();

  allTeamMembers$ = this.teamsService.getAllTeamMembers();

  constructor(
    public dialogRef: MatDialogRef<CreateMeetingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateMeetingDialogComponentProps,
    private teamsService: TeamsService
  ) {}

  onBackClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const { title, description, startDate, endDate, invitedMemberIds } =
      this.form.value;

    const dto: CreateMeetingDTO = {
      title: title!,
      description: description!,
      startDate: startDate!,
      endDate: endDate ?? undefined,
      invitedMemberIds: invitedMemberIds!,
    };

    console.log(dto);
    // this.dialogRef.close(dto);
  }

  private createForm() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = hours + ':' + minutes;

    return new FormGroup({
      title: new FormControl<string>('', [Validators.required]),
      description: new FormControl<string>('', [Validators.required]),
      invitedMemberIds: new FormControl<number[]>([], [Validators.required]),
      startDate: new FormControl<Date>(now, [Validators.required]),
      startTime: new FormControl<string>(currentTime, [Validators.required]),
      endDate: new FormControl<Date | null>(null, []),
      endTime: new FormControl<string | null>(null, []),
    });
  }
}
