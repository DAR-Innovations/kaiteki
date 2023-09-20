import { Task } from './../../models/tasks.model';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-kanban-item',
  templateUrl: './kanban-item.component.html',
  styleUrls: ['./kanban-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanItemComponent {
  @Input() task!: Task;
}
