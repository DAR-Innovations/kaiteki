import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { AnalyticsGraphDTO, UserTotalsStatisticsDTO } from '../models/analytics.dto'

@Injectable({
	providedIn: 'root',
})
export class UsersAnalyticsService {
	private readonly baseUrl = '/api/v1/users/analytics'

	constructor(private httpClient: HttpClient) {}

	getStatistics() {
		return this.httpClient.get<UserTotalsStatisticsDTO>(`${this.baseUrl}/statistics`)
	}

	getPerformanceByPeriod() {
		return this.httpClient.get<AnalyticsGraphDTO>(`${this.baseUrl}/performance-by-period`)
	}

	getTasksCountByTeams() {
		return this.httpClient.get<AnalyticsGraphDTO>(`${this.baseUrl}/tasks-by-teams`)
	}
}
