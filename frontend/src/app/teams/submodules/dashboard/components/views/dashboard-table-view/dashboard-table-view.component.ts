import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core'

import { TeamMembersDTO } from 'src/app/teams/models/team-members.model'

@Component({
	selector: 'app-dashboard-table-view',
	templateUrl: './dashboard-table-view.component.html',
	styleUrls: ['./dashboard-table-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTableViewComponent {
	@Output() onDeleteMemberEmitter = new EventEmitter<number>()
	@Input() members: TeamMembersDTO[] = []

	displayedColumns: string[] = [
		'name',
		'position',
		'email',
		'entryDate',
		'performance',
		'actions',
	]

	constructor() {}

	onDeleteMember(id: number) {
		this.onDeleteMemberEmitter.emit(id)
	}

	onMoreClick(event: Event) {
		event.stopPropagation()
	}

	getPerformanceColor(performance: number) {
		if (performance <= 100 && performance >= 70) {
			return '#6d9f33'
		} else if (performance < 70 && performance >= 40) {
			return '#f4a40f'
		} else {
			return '#ef6a6b'
		}
	}
}
