import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-task-view-page',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskViewComponent {}
