import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-task-edit-page',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskEditComponent {}
