import { Injectable } from '@angular/core'

import {
	BehaviorSubject,
	EMPTY,
	Subject,
	catchError,
	startWith,
	switchMap,
	take,
	tap,
	throwError,
} from 'rxjs'

import { PageableRequest } from 'src/app/shared/models/pagination.model'
import { ToastService } from 'src/app/shared/services/toast.service'

import { AuthService } from 'src/app/auth/services/auth.service'

import { TeamMembersFilterDTO } from '../models/team-members-filter.dto'
import { TeamMembersDTO } from '../models/team-members.model'
import { CreateTeamDTO, Teams, UpdateTeamDTO } from '../models/teams.model'

import { TeamsApiService } from './teams-api.service'

@Injectable({
	providedIn: 'root',
})
export class TeamsService {
	private refetchTeamsSubject = new Subject<void>()
	private currentTeamSubject = new BehaviorSubject<Teams | null>(null)
	private currentTeamMemberSubject = new BehaviorSubject<TeamMembersDTO | null>(null)

	private refetchTeams$ = this.refetchTeamsSubject.asObservable()

	currentTeam$ = this.currentTeamSubject.asObservable()
	currentTeamMember$ = this.currentTeamMemberSubject.asObservable()

	teams$ = this.refetchTeams$.pipe(
		startWith([]),
		switchMap(() => this.getTeams()),
	)

	constructor(
		private teamsApiService: TeamsApiService,
		private toastService: ToastService,
		private authService: AuthService,
	) {}

	public refetchTeams() {
		this.refetchTeamsSubject.next()
	}

	public refetchCurrentTeam() {
		this.currentTeam$
			.pipe(
				switchMap(team => {
					if (team) {
						return this.teamsApiService.getTeamById(team.id)
					}

					return throwError(() => Error('No current team'))
				}),
				take(1),
				catchError(err => {
					this.toastService.error('Failed to refetch current team')
					return throwError(() => err)
				}),
			)
			.subscribe(team => {
				this.setCurrentTeam(team)
			})
	}

	public getTeams() {
		return this.teamsApiService.getTeams()
	}

	public updateTeam(dto: UpdateTeamDTO) {
		return this.currentTeam$.pipe(
			switchMap(team => {
				if (team) {
					return this.teamsApiService.updateTeam(team.id, dto)
				}

				return throwError(() => Error('No current team'))
			}),
		)
	}

	public createTeam(dto: CreateTeamDTO) {
		return this.teamsApiService.createTeam(dto)
	}

	public getTeamById(id: number) {
		return this.teamsApiService.getTeamById(id)
	}

	public deleteTeamMember(teamMemberId: number) {
		return this.currentTeam$.pipe(
			tap(team => {
				if (!team) {
					throwError(() => Error('No current team'))
				}
			}),
			switchMap(team => {
				if (team) {
					return this.teamsApiService.deleteTeamMember(team.id, teamMemberId)
				}

				return EMPTY
			}),
		)
	}

	public deleteTeam() {
		return this.currentTeam$.pipe(
			tap(team => {
				if (!team) {
					throwError(() => Error('No current team'))
				}
			}),
			switchMap(team => {
				if (team) {
					return this.teamsApiService.deleteTeam(team.id)
				}

				return EMPTY
			}),
		)
	}

	public searchTeamMembers(page: PageableRequest, filter: TeamMembersFilterDTO) {
		return this.currentTeam$.pipe(
			tap(team => {
				if (!team) {
					throwError(() => Error('No current team'))
				}
			}),
			switchMap(team => {
				if (team) {
					return this.teamsApiService.searchTeamMembers(team.id, page, filter)
				}

				return EMPTY
			}),
		)
	}

	public getAllTeamMembers() {
		return this.currentTeam$.pipe(
			tap(team => {
				if (!team) {
					throwError(() => Error('No current team'))
				}
			}),
			switchMap(team => {
				if (team) {
					return this.teamsApiService.getAllTeamMembers(team.id, false)
				}

				return EMPTY
			}),
		)
	}

	public getAllTeamMembersExceptCurrent() {
		return this.currentTeam$.pipe(
			tap(team => {
				if (!team) {
					throwError(() => Error('No current team'))
				}
			}),
			switchMap(team => {
				if (team) {
					return this.teamsApiService.getAllTeamMembers(team.id, true)
				}

				return EMPTY
			}),
		)
	}

	public getTeamInvitation() {
		return this.currentTeam$.pipe(
			switchMap(team => {
				if (!team) return throwError(() => Error('No current team'))
				return this.teamsApiService.getTeamInvitation(team.id)
			}),
			catchError(() => {
				this.toastService.open('Failed to get team link')
				return throwError(() => Error('No current team'))
			}),
		)
	}

	public joinTeamByLink(token: string) {
		return this.teamsApiService.joinTeamByLink(token)
	}

	public setCurrentTeam(team: Teams | null) {
		if (!team) {
			this.currentTeamSubject.next(null)
			this.currentTeamMemberSubject.next(null)
		} else {
			this.currentTeamSubject.next(team)
			this.authService.user$
				.pipe(
					switchMap(user => {
						if (user && team) {
							return this.teamsApiService.getTeamMemberByUserId(team.id, user.id)
						}

						return throwError(() => Error('No current user'))
					}),
					take(1),
				)
				.subscribe(teamMember => {
					this.currentTeamMemberSubject.next(teamMember)
				})
		}
	}
}
