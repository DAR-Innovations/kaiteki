import { Injectable } from '@angular/core'

import { switchMap, throwError } from 'rxjs'

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

	getLatestUserPerformance() {
		return this.performanceApiService.getLatestUserPerformance()
	}

	getCurrentTeamMemberPerformance() {
		return this.teamsService.currentTeamMember$.pipe(
			switchMap(teamMember => {
				if (teamMember) {
					return this.getTeamMemberPerformance(teamMember.id)
				}

				return throwError(() => Error('No current team member'))
			}),
		)
	}

	getTeamMemberPerformanceByTeam() {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.performanceApiService.getTeamMemberPerformanceByTeam(team.id)
				}

				return throwError(() => Error('No current team'))
			}),
		)
	}

	addMemberScreenTimeMinutes(minutes: number) {
		return this.teamsService.currentTeamMember$.pipe(
			switchMap(teamMember => {
				if (teamMember) {
					return this.performanceApiService.addMemberScreenTimeMinutes(teamMember.id, minutes)
				}

				return throwError(() => Error('No current team member'))
			}),
		)
	}
}
