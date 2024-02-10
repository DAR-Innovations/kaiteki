import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

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
    public dialogRef: MatDialogRef<MeetingsSelectedDialogComponent>,
    private router: Router,
  ) {
    this.selectedMeeting = data.selectedMeeting;
  }

  onJoinMeetingClick() {
    const currentUrl = this.router.url;
    const newUrl = currentUrl + `/${this.selectedMeeting.id}`;
    this.router.navigateByUrl(newUrl);
    this.dialogRef.close(null);
  }
}
