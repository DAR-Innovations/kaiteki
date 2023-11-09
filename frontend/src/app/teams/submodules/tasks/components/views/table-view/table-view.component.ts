import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Task, TaskColumn } from '../../../models/tasks.model';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableViewComponent {
  @Input() set columns(cols: TaskColumn[]) {
    for (const column of cols) {
      this.tasks = this.tasks.concat(column.tasks);
    }
  }

  tasks: Task[] = [];

  displayedColumns: string[] = [
    'id',
    'title',
    'assignee',
    'deadline',
    'priority',
    'status',
    'actions',
  ];

  onTaskMoreClick(e: Event) {
    e.stopPropagation();
  }
}
