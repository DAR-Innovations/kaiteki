import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { createQueryParams } from 'src/app/shared/utils/request-params.util'

import { TaskStatusType } from '../../tasks/models/tasks.model'
import { AnalyticsGraphDTO, GetTotalsStatisticsDTO } from '../models/analytics-dto.models'

@Injectable({
	providedIn: 'root',
})
export class TeamsAnalyticsApiService {
	private readonly baseUrl = '/api/v1/teams/analytics'

	constructor(private httpClient: HttpClient) {}

	getStatistics(teamId: number) {
		return this.httpClient.get<GetTotalsStatisticsDTO>(`${this.baseUrl}/statistics`, {
			params: createQueryParams({ teamId }),
		})
	}

	getPerformanceByPeriod(teamId: number) {
		return this.httpClient.get<AnalyticsGraphDTO>(`${this.baseUrl}/performance-by-period`, {
			params: createQueryParams({ teamId }),
		})
	}

	getTaskCountsByExecutorAndStatus(teamId: number, type: TaskStatusType) {
		return this.httpClient.get<AnalyticsGraphDTO>(`${this.baseUrl}/tasks-by-executor`, {
			params: createQueryParams({ teamId, type }),
		})
	}
}
