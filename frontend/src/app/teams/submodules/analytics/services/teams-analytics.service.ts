import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { switchMap, throwError } from 'rxjs'

import { createQueryParams } from 'src/app/shared/utils/request-params.util'

import { TaskStatusType } from '../../tasks/models/tasks.model'
import { AnalyticsGraphDTO, TeamsTotalsStatisticsDTO } from '../models/analytics.dto'

import { TeamsService } from './../../../services/teams.service'

@Injectable({
	providedIn: 'root',
})
export class TeamsAnalyticsService {
	private readonly baseUrl = '/api/v1/teams/analytics'

	constructor(
		private teamsService: TeamsService,
		private httpClient: HttpClient,
	) {}

	getStatistics() {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.httpClient.get<TeamsTotalsStatisticsDTO>(`${this.baseUrl}/statistics`, {
						params: createQueryParams({ teamId: team.id }),
					})
				}

				return throwError(() => Error('No current team'))
			}),
		)
	}

	getPerformanceByPeriod() {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.httpClient.get<AnalyticsGraphDTO>(`${this.baseUrl}/performance-by-period`, {
						params: createQueryParams({ teamId: team.id }),
					})
				}

				return throwError(() => Error('No current team'))
			}),
		)
	}

	getTaskCountsByExecutorAndStatus(type: TaskStatusType) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.httpClient.get<AnalyticsGraphDTO>(`${this.baseUrl}/tasks-by-executor`, {
						params: createQueryParams({ teamId: team.id, type }),
					})
				}

				return throwError(() => Error('No current team'))
			}),
		)
	}
}
