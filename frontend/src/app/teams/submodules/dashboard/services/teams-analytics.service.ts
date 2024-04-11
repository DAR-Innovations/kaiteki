import { Injectable } from '@angular/core'

import { switchMap, throwError } from 'rxjs'

import { TaskStatusType } from '../../tasks/models/tasks.model'

import { TeamsService } from './../../../services/teams.service'
import { TeamsAnalyticsApiService } from './teams-analytics-api.service'

@Injectable({
	providedIn: 'root',
})
export class TeamsAnalyticsService {
	constructor(
		private teamsAnalyticsApiService: TeamsAnalyticsApiService,
		private teamsService: TeamsService,
	) {}

	getStatistics() {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.teamsAnalyticsApiService.getStatistics(team.id)
				}

				return throwError(() => Error('No current team'))
			}),
		)
	}

	getPerformanceByPeriod() {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.teamsAnalyticsApiService.getPerformanceByPeriod(team.id)
				}

				return throwError(() => Error('No current team'))
			}),
		)
	}

	getTaskCountsByExecutorAndStatus(type: TaskStatusType) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.teamsAnalyticsApiService.getTaskCountsByExecutorAndStatus(team.id, type)
				}

				return throwError(() => Error('No current team'))
			}),
		)
	}
}
