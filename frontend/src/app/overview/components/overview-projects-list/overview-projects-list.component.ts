import { ChangeDetectionStrategy, Component } from '@angular/core'

import { TeamsService } from 'src/app/teams/services/teams.service'

@Component({
	selector: 'app-overview-projects-list',
	templateUrl: './overview-projects-list.component.html',
	styleUrl: './overview-projects-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewProjectsListComponent {
	teams$ = this.teamsService.teams$

	constructor(private teamsService: TeamsService) {}
}
