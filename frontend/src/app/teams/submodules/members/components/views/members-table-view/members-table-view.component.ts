import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'

import { TeamMembersDTO } from 'src/app/teams/models/team-members.model'

@Component({
	selector: 'app-members-table-view',
	templateUrl: './members-table-view.component.html',
	styleUrls: ['./members-table-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersTableViewComponent {
	@Output() delete = new EventEmitter<number>()
	@Input() members: TeamMembersDTO[] = []

	displayedColumns: string[] = ['name', 'position', 'email', 'entryDate', 'performance', 'actions']

	onDeleteMember(id: number) {
		this.delete.emit(id)
	}

	onMoreClick(event: Event) {
		event.stopPropagation()
	}

	getPerformanceColor(performance: number) {
		if (performance >= 100 && performance >= 70) {
			return '#6d9f33'
		} else if (performance < 70 && performance >= 40) {
			return '#f4a40f'
		} else {
			return '#ef6a6b'
		}
	}
}
