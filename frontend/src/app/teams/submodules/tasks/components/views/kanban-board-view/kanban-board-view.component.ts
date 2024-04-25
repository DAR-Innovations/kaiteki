import { ChangeDetectionStrategy, Component } from '@angular/core'

import { TasksBaseViewComponent } from '../tasks-base-view/tasks-base-view.component'

@Component({
	selector: 'app-kanban-board-view',
	templateUrl: './kanban-board-view.component.html',
	styleUrls: ['./kanban-board-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoardViewComponent extends TasksBaseViewComponent {}
