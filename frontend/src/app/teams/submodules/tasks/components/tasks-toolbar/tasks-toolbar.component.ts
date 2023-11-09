import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';
import { CustomizeDialogComponent } from '../customize-dialog/customize-dialog.component';

@Component({
  selector: 'app-tasks-toolbar',
  templateUrl: './tasks-toolbar.component.html',
  styleUrls: ['./tasks-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksToolbarComponent {
  @Output() onFilter = new EventEmitter();

  executors: string[] = ['Diar Begisbayev', 'Lana Savras', 'Ramazan Seiitbek'];
  defaultExecutors: string[] = ['My Tasks', 'All Assigned', 'All Unassigned'];

  views: string[] = ['List', 'Kanban', 'Table'];

  sortings: string[] = [
    'Priority ASC',
    'Prioriy DESC',
    'Date ASC',
    'Date DESC',
  ];

  filter = {
    executor: this.defaultExecutors[0],
    view: this.views[2],
    sortBy: this.sortings[0],
  };

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.onFilter.emit(this.filter);
  }

  onChangeExecutor(value: string) {
    this.filter.executor = value;
    this.onFilter.emit(this.filter);
  }

  onChangeView(value: string) {
    this.filter.view = value;
    this.onFilter.emit(this.filter);
  }

  onChangeSort(value: string) {
    this.filter.sortBy = value;
    this.onFilter.emit(this.filter);
  }

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
