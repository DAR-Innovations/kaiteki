import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import {
	AddMemberPerformanceValues,
	TeamMemberPerformanceDTO,
} from '../models/member-performance.model'
import {
	TeamPerformance,
	TeamPerformanceMetrics,
	UpdateTeamPerformanceMetricsDTO,
} from '../models/team-performance.model'

@Injectable({
	providedIn: 'root',
})
export class PerformanceApiService {
	private readonly baseUrl = '/api/v1/performance'

	constructor(private httpClient: HttpClient) {}

	getMetrics(teamId: number) {
		return this.httpClient.get<TeamPerformanceMetrics>(`${this.baseUrl}/teams/${teamId}/metrics`)
	}

	updateMetrics(teamId: number, dto: UpdateTeamPerformanceMetricsDTO) {
		return this.httpClient.put<TeamPerformanceMetrics>(
			`${this.baseUrl}/teams/${teamId}/metrics`,
			dto,
		)
	}

	getTeamPerformance(teamId: number) {
		return this.httpClient.get<TeamPerformance>(`${this.baseUrl}/teams/${teamId}`)
	}

	getTeamMemberPerformance(memberId: number) {
		return this.httpClient.get<TeamPerformanceMetrics>(`${this.baseUrl}/team-members/${memberId}`)
	}

	getTeamMemberPerformanceByTeam(teamId: number) {
		return this.httpClient.get<TeamMemberPerformanceDTO[]>(
			`${this.baseUrl}/team-members/teams/${teamId}`,
		)
	}

	addTeamMemberPerformanceValues(memberId: number, dto: AddMemberPerformanceValues) {
		return this.httpClient.post<void>(`${this.baseUrl}/team-members/${memberId}/add`, dto)
	}
}
