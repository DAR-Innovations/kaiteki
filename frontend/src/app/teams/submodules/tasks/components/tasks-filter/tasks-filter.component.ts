import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tasks-filter',
  templateUrl: './tasks-filter.component.html',
  styleUrls: ['./tasks-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksFilterComponent {
  executors: string[] = ['Diar Begisbayev', 'Lana Savras', 'Ramazan Seiitbek'];
  defaultExecutors: string[] = ['My Tasks', 'All Assigned', 'All Unassigned'];
  selectedExecutor = 'My Tasks';

  views: string[] = ['List', 'Kanban'];
  selectedView = 'Kanban';

  sortings: string[] = [
    'Priority ASC',
    'Prioriy DESC',
    'Date ASC',
    'Date DESC',
  ];
  selectedSorting = 'Prioriy DESC';

  onChangeExecutor(value: string) {
    this.selectedExecutor = value;
  }

  onChangeView(value: string) {
    this.selectedView = value;
  }

  onChangeSort(value: string) {
    this.selectedSorting = value;
  }
}
