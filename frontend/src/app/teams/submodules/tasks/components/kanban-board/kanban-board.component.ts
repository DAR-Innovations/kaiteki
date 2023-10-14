import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TaskColumn } from '../../models/tasks.model';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoardComponent {
  @Input() columns: TaskColumn[] = [];
  @Input() connectedColumns: string[] = [];
}
