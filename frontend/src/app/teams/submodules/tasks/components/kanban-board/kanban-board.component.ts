import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { KanbanColumn } from '../../models/tasks.model';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoardComponent {
  @Input() columns: KanbanColumn[] = [];
  @Input() connectedColumns: string[] = [];
}
