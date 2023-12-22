import { Observable, of } from 'rxjs';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { TaskStatus, TaskPriority } from '../../models/tasks.model';
import { TasksFilterDTO } from '../../models/tasks-filter.dto';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-tasks-list-page',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent implements OnInit {
  columns$ = this.tasksService.getStatusesWithTasks();
  filter: TasksFilterDTO = {};

  constructor(
    private cd: ChangeDetectorRef,
    private tasksService: TasksService
  ) {}

  ngOnInit() {}

  onRefresh() {
    this.columns$ = this.tasksService.getStatusesWithTasks();
    this.cd.markForCheck();
  }

  onFilter(filter: any) {
    this.filter = filter;
    this.cd.markForCheck();
  }
}
