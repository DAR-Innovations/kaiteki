import { ChangeDetectionStrategy, Component } from '@angular/core'

import { PerformanceService } from './../../../../performance/services/performance.service'

@Component({
	selector: 'app-sidebar-top-members',
	templateUrl: './sidebar-top-members.component.html',
	styleUrl: './sidebar-top-members.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarTopMembersComponent {
	topMembers$ = this.performanceService.getTeamMemberPerformanceByTeam()

	constructor(private performanceService: PerformanceService) {}
}
