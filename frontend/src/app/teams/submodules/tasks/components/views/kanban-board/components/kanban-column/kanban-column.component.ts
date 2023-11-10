import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Task, TaskStatus } from 'src/app/teams/submodules/tasks/models/tasks.model';

@Component({
  selector: 'app-kanban-column',
  templateUrl: './kanban-column.component.html',
  styleUrls: ['./kanban-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanColumnComponent {
  @Input() column!: TaskStatus;
  @Input() connectedColumns: string[] = [];

  public drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  get getColumnTasksCount() {
    return this.column.tasks.length;
  }

  get getColumnBorderBottomStyle() {
    return `2px solid ${this.column.color}`;
  }
}
