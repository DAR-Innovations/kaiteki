import { ChangeDetectionStrategy, Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { take } from 'rxjs'
import { TeamsService } from 'src/app/teams/services/teams.service'
import { MeetingsDTO } from '../../../models/meetings.types'

interface MeetingsSelectedDialogComponentProps {
  selectedMeeting: MeetingsDTO
}

@Component({
  selector: 'app-meetings-selected-dialog',
  templateUrl: './meetings-selected-dialog.component.html',
  styleUrls: ['./meetings-selected-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingsSelectedDialogComponent {
  selectedMeeting: MeetingsDTO | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MeetingsSelectedDialogComponentProps,
    public dialogRef: MatDialogRef<MeetingsSelectedDialogComponent>,
    private router: Router,
    private teamsService: TeamsService
  ) {
    this.selectedMeeting = data.selectedMeeting;
  }

  onJoinMeetingClick() {
    if (this.selectedMeeting) {
      this.teamsService.currentTeam$.pipe(take(1)).subscribe(team => {
        this.router.navigate(['hub', 'teams', team?.id, 'meetings', this.selectedMeeting?.id]);
      })
    }

    this.dialogRef.close(null);
  }
}
