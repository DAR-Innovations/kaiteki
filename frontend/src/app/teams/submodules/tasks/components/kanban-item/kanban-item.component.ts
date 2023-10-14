import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Task, TaskPriority } from '../../models/tasks.model';

@Component({
  selector: 'app-kanban-item',
  templateUrl: './kanban-item.component.html',
  styleUrls: ['./kanban-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanItemComponent {
  @Input() task: Task | null = null;

  get taskPriority() {
    switch (this.task?.priority) {
      case TaskPriority.CRITICAL:
        return 'Critical';
      case TaskPriority.HIGH:
        return 'High';
      case TaskPriority.MEDIUM:
        return 'Medium';
      case TaskPriority.LOW:
        return 'Low';
      default:
        return '';
    }
  }

  get taskPriorityColor() {
    switch (this.task?.priority) {
      case TaskPriority.CRITICAL:
        return '#FF6666';
      case TaskPriority.HIGH:
        return '#FFA500';
      case TaskPriority.MEDIUM:
        return '#8ce98c';
      case TaskPriority.LOW:
        return '#08FFFF';
      default:
        return '';
    }
  }
}
