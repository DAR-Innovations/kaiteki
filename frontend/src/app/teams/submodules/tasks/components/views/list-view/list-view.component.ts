import { ChangeDetectionStrategy, Component } from '@angular/core'

import { TasksBaseViewComponent } from '../tasks-base-view/tasks-base-view.component'

@Component({
	selector: 'app-list-view',
	templateUrl: './list-view.component.html',
	styleUrls: ['./list-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListViewComponent extends TasksBaseViewComponent {}
