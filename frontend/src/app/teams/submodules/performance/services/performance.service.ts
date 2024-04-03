import { Injectable } from '@angular/core'

import { switchMap, throwError } from 'rxjs'

import { AddMemberPerformanceValues } from '../models/member-performance.model'
import { UpdateTeamPerformanceMetricsDTO } from '../models/team-performance.model'

import { TeamsService } from './../../../services/teams.service'
import { PerformanceApiService } from './performance-api.service'

@Injectable({
	providedIn: 'root',
})
export class PerformanceService {
	constructor(
		private performanceApiService: PerformanceApiService,
		private teamsService: TeamsService,
	) {}

	getMetrics() {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.performanceApiService.getMetrics(team.id)
				}

				return throwError(() => Error('No current team'))
			}),
		)
	}

	updateMetrics(dto: UpdateTeamPerformanceMetricsDTO) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.performanceApiService.updateMetrics(team.id, dto)
				}

				return throwError(() => Error('No current team'))
			}),
		)
	}

	getTeamPerformance() {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.performanceApiService.getTeamPerformance(team.id)
				}

				return throwError(() => Error('No current team'))
			}),
		)
	}

	getTeamMemberPerformance(memberId: number) {
		return this.performanceApiService.getTeamMemberPerformance(memberId)
	}

	addTeamMemberPerformanceValues(memberId: number, dto: AddMemberPerformanceValues) {
		return this.performanceApiService.addTeamMemberPerformanceValues(memberId, dto)
	}
}
