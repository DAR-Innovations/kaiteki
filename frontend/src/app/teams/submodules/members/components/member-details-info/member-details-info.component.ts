import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'

import dayjs from 'dayjs'
import { Observable, of } from 'rxjs'

import { TeamMembersDTO } from 'src/app/teams/models/team-members.model'
import { TeamMembersApiService } from 'src/app/teams/services/team-members-api.service'

@Component({
	selector: 'app-member-details-info',
	templateUrl: './member-details-info.component.html',
	styleUrl: './member-details-info.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberDetailsInfoComponent implements OnInit {
	@Input() memberId!: number

	member$: Observable<TeamMembersDTO | null> = of(null)

	constructor(private teamMembersService: TeamMembersApiService) {}

	ngOnInit() {
		this.member$ = this.teamMembersService.getTeamMemberById(this.memberId)
	}

	getWorkPeriodString(hireDate: Date): string {
		const diff = dayjs().diff(hireDate, 'hours', true)

		const years = Math.floor(diff / (365 * 24))
		const months = Math.floor((diff % (365 * 24)) / (30 * 24))
		const days = Math.floor((diff % (30 * 24)) / 24)
		const hours = Math.floor(diff % 24)

		const parts: string[] = []
		if (years > 0) {
			parts.push(`${years} year${years > 1 ? 's' : ''}`)
		}
		if (months > 0) {
			parts.push(`${months} month${months > 1 ? 's' : ''}`)
		}
		if (days > 0) {
			parts.push(`${days} day${days > 1 ? 's' : ''}`)
		}
		if (hours > 0 && parts.length === 0) {
			parts.push(`${hours} hour${hours > 1 ? 's' : ''}`)
		}

		return parts.join(', ')
	}
}
