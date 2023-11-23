import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { MeetingDTO } from '../../../models/meetings.types';
import { MatDialog } from '@angular/material/dialog';
import { MeetingsSelectedDialogComponent } from '../../dialogs/meetings-selected-dialog/meetings-selected-dialog.component';

@Component({
  selector: 'app-meetings-calendar-view',
  templateUrl: './meetings-calendar-view.component.html',
  styleUrls: ['./meetings-calendar-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingsCalendarViewComponent {
  @Input() meetings: MeetingDTO[] = [];

  viewDate: Date = new Date();
  refresh = new Subject<void>();

  constructor(private dialog: MatDialog) {}

  onSelectMeeting(meeting: CalendarEvent<MeetingDTO>) {
    const dialogRef = this.dialog.open(MeetingsSelectedDialogComponent, {
      data: { selectedMeeting: meeting },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
