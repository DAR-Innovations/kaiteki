import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateMeetingDialogComponent } from '../dialogs/create-meeting-dialog/create-meeting-dialog.component';

@Component({
  selector: 'app-meetings-toolbar',
  templateUrl: './meetings-toolbar.component.html',
  styleUrls: ['./meetings-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingsToolbarComponent {
  views: string[] = ['List', 'Calendar'];
  selectedView = this.views[0];

  sortings: string[] = [
    'Priority ASC',
    'Prioriy DESC',
    'Date ASC',
    'Date DESC',
  ];
  selectedSorting = this.sortings[0];

  onChangeView(value: string) {
    this.selectedView = value;
  }

  onChangeSort(value: string) {
    this.selectedSorting = value;
  }

  constructor(private dialog: MatDialog) {}

  onCreateButtonClick(event: Event) {
    const dialogRef = this.dialog.open(CreateMeetingDialogComponent, {});

    dialogRef.afterClosed().subscribe((form) => {
      console.log(form);
    });
  }
}
