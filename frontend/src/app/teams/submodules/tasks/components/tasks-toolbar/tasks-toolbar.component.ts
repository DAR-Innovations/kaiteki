import { TasksService } from './../../services/tasks.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  constructor(
    public dialog: MatDialog,
    private tasksService: TasksService,
    private toastrService: ToastrService
  ) {}

  onAddNewClick(event: Event) {
    event.stopPropagation();

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
        this.tasksService.triggerRefreshTasks();
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
        this.tasksService.triggerRefreshTasks();
      });
  }
}
