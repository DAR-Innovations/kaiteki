import { Subject, takeUntil } from 'rxjs';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TasksFilterDTO } from '../../models/tasks-filter.dto';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-tasks-list-page',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  filter: TasksFilterDTO = {};
  columns$ = this.tasksService.getStatusesWithTasks(this.filter);

  constructor(
    private cd: ChangeDetectorRef,
    private tasksService: TasksService
  ) {}

  ngOnInit() {
    this.tasksService.refreshTasksState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadStatusesWithTasks();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadStatusesWithTasks() {
    this.columns$ = this.tasksService.getStatusesWithTasks(this.filter);
    this.cd.markForCheck();
  }

  onFilter(filter: any) {
    this.filter = filter;
    this.loadStatusesWithTasks();
  }
}
