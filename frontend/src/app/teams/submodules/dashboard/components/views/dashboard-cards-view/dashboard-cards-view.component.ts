import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core'

import { TeamMembersDTO } from 'src/app/teams/models/team-members.model'

@Component({
	selector: 'app-dashboard-cards-view',
	templateUrl: './dashboard-cards-view.component.html',
	styleUrls: ['./dashboard-cards-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCardsViewComponent {
	@Output() delete = new EventEmitter<number>()
	@Input() members: TeamMembersDTO[] = []

	onDeleteMember(id: number) {
		this.delete.emit(id)
	}

	trackByTeamMembers(i: number, teamMember: TeamMembersDTO) {
		return teamMember.id
	}

	getPerformanceColor(performance: number) {
		if (performance <= 100 && performance >= 70) {
			return ['#6d9f33', '#F0F5EA']
		} else if (performance < 70 && performance >= 40) {
			return ['#f4a40f', '#FDF5E7']
		} else {
			return ['#ef6a6b', '#FDF0F0']
		}
	}
}
