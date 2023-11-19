import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TaskStatus } from '../../../models/tasks.model';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoardComponent {
  // @Input() columns: TaskColumn[] = [];

  @Input() set columns(cols: TaskStatus[]) {
    this._connectedColumns = cols.map((c) => c.id.toLocaleString());
    this._columns = cols;
  }

  _connectedColumns: string[] = [];
  _columns: TaskStatus[] = [];

  constructor() {}

  get columns() {
    return this._columns;
  }

  get connectedColumns() {
    return this._connectedColumns;
  }
}
