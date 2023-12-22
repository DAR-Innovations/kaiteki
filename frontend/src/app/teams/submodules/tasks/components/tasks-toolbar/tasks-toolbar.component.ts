import { TasksService } from './../../services/tasks.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../dialogs/create-task-dialog/create-task-dialog.component';
import { CustomizeDialogComponent } from '../dialogs/customize-dialog/customize-dialog.component';
import { SaveTaskStatusDTO } from '../../models/customize-task.dto';
import { EMPTY, catchError, switchMap, take, tap, throwError } from 'rxjs';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { CreateTaskDTO } from '../../models/create-task.dto';

@Component({
  selector: 'app-tasks-toolbar',
  templateUrl: './tasks-toolbar.component.html',
  styleUrls: ['./tasks-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksToolbarComponent {
  @Output() onRefresh = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private tasksService: TasksService,
    private toastrService: ToastrService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  onAddNewClick(event: Event) {
    const dialogRef = this.dialog.open<any, any, CreateTaskDTO>(
      CreateTaskDialogComponent,
      {
        width: '100%',
        data: {},
      }
    );

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((value) => {
          if (value) {
            return this.tasksService.createTask(value);
          }
          return EMPTY;
        }),
        catchError((err) => {
          this.toastrService.open('Failed to create a task');
          return throwError(() => err);
        }),
        take(1)
      )
      .subscribe(() => {
        this.toastrService.open('Successfully created task');
        this.onRefresh.emit();
      });
  }

  onCustomizeClick(event: Event) {
    const dialogRef = this.dialog.open<any, any, SaveTaskStatusDTO[]>(
      CustomizeDialogComponent,
      {
        minWidth: '60%',
      }
    );

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((value) => {
          if (value) {
            return this.tasksService.saveCustomizeStatuses(value);
          }
          return EMPTY;
        }),
        catchError((err) => {
          this.toastrService.open('Failed to save statuses');
          return throwError(() => err);
        }),
        take(1)
      )
      .subscribe(() => {
        this.toastrService.open('Successfully saved statuses');
        this.onRefresh.emit();
      });
  }
}
