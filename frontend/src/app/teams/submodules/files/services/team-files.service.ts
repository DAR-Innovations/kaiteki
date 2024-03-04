import { Injectable } from '@angular/core'

import { Subject, switchMap, throwError } from 'rxjs'

import { PageableRequest } from 'src/app/shared/models/pagination.model'

import { TeamsService } from 'src/app/teams/services/teams.service'

import {
	TeamFilesFilter,
	UpdateTeamFileDTO,
	UploadTeamFileDTO,
} from '../models/team-files.dto'

import { TeamFilesApiService } from './team-files-api.service'

@Injectable({
	providedIn: 'root',
})
export class TeamFilesService {
	private refreshTeamFilesSubject = new Subject<void>()
	refreshTeamFiles$ = this.refreshTeamFilesSubject.asObservable()

	constructor(
		private teamFilesApiService: TeamFilesApiService,
		private teamsService: TeamsService
	) {}

	triggerRefreshTeamFiles() {
		this.refreshTeamFilesSubject.next()
	}

	uploadTeamFile(dto: UploadTeamFileDTO) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.teamFilesApiService.uploadTeamFile(team.id, dto)
				}

				return throwError(() => Error('No current team'))
			})
		)
	}

	getTeamFiles(pageable: PageableRequest, filter: TeamFilesFilter) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.teamFilesApiService.getTeamFiles(
						team.id,
						pageable,
						filter
					)
				}

				return throwError(() => Error('No current team'))
			})
		)
	}

	deleteTeamFile(id: number) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.teamFilesApiService.deleteTeamFile(team.id, id)
				}

				return throwError(() => Error('No current team'))
			})
		)
	}

	updateTeamFile(id: number, dto: UpdateTeamFileDTO) {
		return this.teamsService.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.teamFilesApiService.updateTeamFile(team.id, id, dto)
				}

				return throwError(() => Error('No current team'))
			})
		)
	}
}
