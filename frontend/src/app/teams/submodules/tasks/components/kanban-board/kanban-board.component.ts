import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TaskColumn } from '../../models/tasks.model';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoardComponent {
  // @Input() columns: TaskColumn[] = [];

  @Input() set columns(cols: TaskColumn[]) {
    this._connectedColumns = cols.map((c) => c.id.toLocaleString());
    this._columns = cols;
  }

  _connectedColumns: string[] = [];
  _columns: TaskColumn[] = [];

  constructor() {}

  get columns() {
    return this._columns;
  }

  get connectedColumns() {
    return this._connectedColumns;
  }
}
