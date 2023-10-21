import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TaskColumn } from '../../../../models/tasks.model';

@Component({
  selector: 'app-list-panel',
  templateUrl: './list-panel.component.html',
  styleUrls: ['./list-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPanelComponent {
  @Input() column: TaskColumn | null = null;

  panelOpenState = false;
  displayedColumns: string[] = [
    'id',
    'title',
    'assignee',
    'deadline',
    'priority',
    'actions',
  ];

  onTaskMoreClick(e: Event) {
    e.stopPropagation();
  }
}
