import { ChangeDetectionStrategy, Component } from '@angular/core'

import { TeamsService } from 'src/app/teams/services/teams.service'

@Component({
	selector: 'app-overview-teams-list',
	templateUrl: './overview-teams-list.component.html',
	styleUrl: './overview-teams-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewTeamsListComponent {
	teams$ = this.teamsService.teams$

	constructor(private teamsService: TeamsService) {}
}
