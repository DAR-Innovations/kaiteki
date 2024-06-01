import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Observable, switchMap, throwError } from 'rxjs'

import { createQueryParams } from 'src/app/shared/utils/request-params.util'

import { TeamsService } from 'src/app/teams/services/teams.service'

import { AnalyticsGraphDTO, UserTotalsStatisticsDTO } from '../models/analytics.dto'
import { ExportMembersDTO } from '../models/members-export.dto'

@Injectable({
	providedIn: 'root',
})
export class TeamMembersAnalyticsService {
	private readonly baseUrl = '/api/v1/members/analytics'

	constructor(
		private httpClient: HttpClient,
		private teamsService: TeamsService,
	) {}

	getStatistics(teamMemberId: number) {
		return this.httpClient.get<UserTotalsStatisticsDTO>(`${this.baseUrl}/statistics`, {
			params: createQueryParams({ teamMemberId: teamMemberId }),
		})
	}

	getPerformanceByPeriod(teamMemberId: number) {
		return this.httpClient.get<AnalyticsGraphDTO>(`${this.baseUrl}/performance-by-period`, {
			params: createQueryParams({ teamMemberId: teamMemberId }),
		})
	}

	getTasksCountByPriority(teamMemberId: number) {
		return this.httpClient.get<AnalyticsGraphDTO>(`${this.baseUrl}/tasks-by-status`, {
			params: createQueryParams({ teamMemberId: teamMemberId }),
		})
	}

	exportMembers(teamId: number, dto: ExportMembersDTO): Observable<Blob> {
		const params = { ...dto, teamId }

		return this.httpClient.get(`${this.baseUrl}/export`, {
			params: createQueryParams(params),
			responseType: 'blob',
		})
	}

	exportCurrentTeamMembers(dto: ExportMembersDTO) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.exportMembers(team.id, dto)
				}

				return throwError(() => Error('No current team'))
			}),
		)
	}
}
