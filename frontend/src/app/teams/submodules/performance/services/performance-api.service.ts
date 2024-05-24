import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { TeamMemberPerformance, TeamMemberPerformanceDTO } from '../models/member-performance.model'
import {
	PredictedTeamPerformanceDTO,
	TeamPerformance,
	TeamPerformanceMetrics,
	UpdateTeamPerformanceMetricsDTO,
	UserPerformance,
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
		return this.httpClient.get<TeamMemberPerformance>(`${this.baseUrl}/team-members/${memberId}`)
	}

	getTeamMemberPerformanceByTeam(teamId: number) {
		return this.httpClient.get<TeamMemberPerformanceDTO[]>(
			`${this.baseUrl}/team-members/teams/${teamId}`,
		)
	}

	addMemberScreenTimeMinutes(memberId: number, minutes: number) {
		return this.httpClient.post<void>(
			`${this.baseUrl}/team-members/${memberId}/add/screen-time?minutes=${minutes}`,
			{},
		)
	}

	getLatestUserPerformance() {
		return this.httpClient.get<UserPerformance>(`${this.baseUrl}/users`)
	}

	getPredictedTeamPerformance(teamId: number) {
		return this.httpClient.get<PredictedTeamPerformanceDTO>(
			`${this.baseUrl}/teams/${teamId}/predicted`,
		)
	}
}
