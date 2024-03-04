import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { TaskStatus } from '../../../models/tasks.model'

@Component({
	selector: 'app-kanban-board',
	templateUrl: './kanban-board.component.html',
	styleUrls: ['./kanban-board.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoardComponent {
	@Input() set columns(cols: TaskStatus[]) {
		this._connectedColumns = cols.map(c => c.id.toLocaleString())
		this._columns = cols
	}

	private _connectedColumns: string[] = []
	private _columns: TaskStatus[] = []

	get columns() {
		return this._columns
	}

	get connectedColumns() {
		return this._connectedColumns
	}
}
