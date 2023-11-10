import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../dialogs/create-task-dialog/create-task-dialog.component';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomizeDialogComponent } from '../dialogs/customize-dialog/customize-dialog.component';

@Component({
  selector: 'app-tasks-toolbar',
  templateUrl: './tasks-toolbar.component.html',
  styleUrls: ['./tasks-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksToolbarComponent {
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  onAddNewClick(event: Event) {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((form) => {
      console.log('The dialog was closed');
      console.log('Result form', form);
    });
  }

  onCustomizeClick(event: Event) {
    const dialogRef = this.dialog.open(CustomizeDialogComponent, {
      width: '40%',
      data: {},
    });

    dialogRef.afterClosed().subscribe((form) => {
      console.log('The dialog was closed');
      console.log('Result form', form);
    });
  }
}
