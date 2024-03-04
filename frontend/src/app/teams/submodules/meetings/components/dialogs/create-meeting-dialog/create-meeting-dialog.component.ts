import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { TeamsService } from 'src/app/teams/services/teams.service'
import { CreateMeetingDTO } from '../../../models/meetings.dto'

export interface CreateMeetingDialogComponentProps {}

@Component({
  selector: 'app-create-meeting-dialog',
  templateUrl: './create-meeting-dialog.component.html',
  styleUrls: ['./create-meeting-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMeetingDialogComponent {
  isAllDayToggled = false;
  form = this.createForm();

  allTeamMembers$ = this.teamsService.getAllTeamMembers();

  constructor(
    public dialogRef: MatDialogRef<CreateMeetingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateMeetingDialogComponentProps,
    private teamsService: TeamsService
  ) {}

  toggleAllDay(active: boolean) {
    this.isAllDayToggled = active;
  
    const endDateControl = this.form.get('endDate');
  
    if (active) {
      endDateControl?.disable();
  
      const currentDate = new Date();
      currentDate.setHours(23, 59, 59, 0); 
      endDateControl?.setValue(currentDate);
    } else {
      endDateControl?.enable();
      endDateControl?.setValue(null); 
    }
  }

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

    this.dialogRef.close(dto);
  }

  private createForm() {
    return new FormGroup({
      title: new FormControl<string>('', [Validators.required]),
      description: new FormControl<string>('', [Validators.required]),
      invitedMemberIds: new FormControl<number[]>([], [Validators.required]),
      startDate: new FormControl<Date>(new Date(), [Validators.required]),
      endDate: new FormControl<Date | null>(null, [Validators.required]),
    });
  }
}
