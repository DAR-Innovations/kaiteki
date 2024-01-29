import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Task } from '../../models/tasks.model';
import { MatDialog } from '@angular/material/dialog';
import {
  UpdateTaskDialogComponent,
  UpdateTaskDialogComponentProps,
} from '../dialogs/update-task-dialog/update-task-dialog.component';
import { TasksService } from '../../services/tasks.service';
import { EMPTY, catchError, switchMap, take, throwError } from 'rxjs';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { UpdateTaskDTO } from '../../models/update-task.dto';

@Component({
  selector: 'app-task-more-menu[task]',
  templateUrl: './task-more-menu.component.html',
  styleUrls: ['./task-more-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskMoreMenuComponent {
  @Input() task!: Task;

  constructor(
    private dialog: MatDialog,
    private tasksService: TasksService,
    private toastrService: ToastrService
  ) {}

  onEditClick(event: Event) {
    event.stopPropagation();

    const dialogRef = this.dialog.open<
      any,
      UpdateTaskDialogComponentProps,
      UpdateTaskDTO
    >(UpdateTaskDialogComponent, {
      width: '100%',
      data: { task: this.task },
    });

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((form) => {
          if (form) {
            return this.tasksService.updateTask(this.task.id, form);
          }

          return EMPTY;
        }),
        catchError((err) => {
          this.toastrService.error('Failed to update task');
          return throwError(() => err);
        }),
        take(1)
      )
      .subscribe(() => {
        this.toastrService.open('Successfully updated task');
        this.tasksService.triggerRefreshTasks();
      });
  }

  onDeleteClick(event: Event) {
    event.stopPropagation();

    this.tasksService
      .deleteTaskById(this.task.id)
      .pipe(
        catchError((err) => {
          this.toastrService.error('Failed to delete task');
          return throwError(() => err);
        }),
        take(1)
      )
      .subscribe(() => {
        this.toastrService.open('Successfully deleted a task');
        this.tasksService.triggerRefreshTasks();
      });
  }

  onMoreButtonClick(event: Event) {
    event.stopPropagation();
  }
}
