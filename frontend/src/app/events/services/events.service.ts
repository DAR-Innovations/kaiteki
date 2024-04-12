import { Injectable } from '@angular/core'

import { switchMap, throwError } from 'rxjs'

import { PageableRequest } from 'src/app/shared/models/pagination.model'

import { TeamsService } from './../../teams/services/teams.service'
import { EventsAPIService } from './events-api.service'

@Injectable({
	providedIn: 'root',
})
export class EventsService {
	constructor(
		private eventsAPIService: EventsAPIService,
		private teamsService: TeamsService,
	) {}

	public getEvents() {
		return this.eventsAPIService.getEvents()
	}

	public getTeamsEvents(pageable?: PageableRequest) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.eventsAPIService.getTeamsEvents(team.id, pageable)
				}

				return throwError(() => Error('No current team'))
			}),
		)
	}
}
