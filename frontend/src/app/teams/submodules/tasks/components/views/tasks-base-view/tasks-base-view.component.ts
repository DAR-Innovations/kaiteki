import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { TaskStatus } from '../../../models/tasks.model'

@Component({
	selector: 'app-tasks-base-view',
	templateUrl: './tasks-base-view.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksBaseViewComponent {
	@Input() set columns(cols: TaskStatus[]) {
		this._connectedColumns = cols.map(c => c.id.toLocaleString())
		this._columns = cols
	}

	get columns() {
		return this._columns
	}

	private _connectedColumns: string[] = []
	private _columns: TaskStatus[] = []

	get connectedColumns() {
		return this._connectedColumns
	}
}
