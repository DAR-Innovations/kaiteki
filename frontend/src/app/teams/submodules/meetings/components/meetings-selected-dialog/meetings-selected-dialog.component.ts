import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-meetings-selected-dialog',
  templateUrl: './meetings-selected-dialog.component.html',
  styleUrls: ['./meetings-selected-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingsSelectedDialogComponent {
  selectedMeeting: any = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MeetingsSelectedDialogComponent>
  ) {
    this.selectedMeeting = data.selectedMeeting;
  }
}
