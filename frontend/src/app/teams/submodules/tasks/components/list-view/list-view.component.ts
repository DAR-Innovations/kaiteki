import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TaskColumn } from '../../models/tasks.model';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListViewComponent {
  @Input() columns: TaskColumn[] = [];
}
