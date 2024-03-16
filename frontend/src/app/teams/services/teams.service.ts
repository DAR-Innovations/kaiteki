import { Injectable } from '@angular/core'

import {
	BehaviorSubject,
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
import { CreateTeamDTO, Teams } from '../models/teams.model'

import { TeamsApiService } from './teams-api.service'

@Injectable({
	providedIn: 'root',
})
export class TeamsService {
	private refetchTeamsSubject = new Subject<void>()
	private currentTeamSubject = new BehaviorSubject<Teams | null>(null)
	private currentTeamMemberSubject = new BehaviorSubject<TeamMembersDTO | null>(
		null
	)

	currentTeam$ = this.currentTeamSubject.asObservable()
	currentTeamMember$ = this.currentTeamMemberSubject.asObservable()
	refetchTeams$ = this.refetchTeamsSubject.asObservable()

	teams$ = this.refetchTeams$.pipe(
		startWith([]),
		switchMap(() => this.getTeams())
	)

	constructor(
		private teamsApiService: TeamsApiService,
		private toastrService: ToastService,
		private authService: AuthService
	) {}

	public refetchTeams() {
		this.refetchTeamsSubject.next()
	}

	public getTeams() {
		return this.teamsApiService.getTeams()
	}

	public createTeam(dto: CreateTeamDTO) {
		return this.teamsApiService.createTeam(dto)
	}

	public getTeamById(id: number) {
		return this.teamsApiService.getTeamById(id)
	}

	public deleteTeamMember(id: number) {
		return this.currentTeam$.pipe(
			tap(team => {
				if (!team) {
					throwError(() => Error('No current team'))
				}
			}),
			switchMap(team => {
				return this.teamsApiService.deleteTeamMember(team!.id, id)
			})
		)
	}

	public searchTeamMembers(
		page: PageableRequest,
		filter: TeamMembersFilterDTO
	) {
		return this.currentTeam$.pipe(
			tap(team => {
				if (!team) {
					throwError(() => Error('No current team'))
				}
			}),
			switchMap(team => {
				return this.teamsApiService.searchTeamMembers(team!.id, page, filter)
			})
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
				return this.teamsApiService.getAllTeamMembers(team!.id, false)
			})
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
				return this.teamsApiService.getAllTeamMembers(team!.id, true)
			})
		)
	}

	public getTeamInvitation() {
		return this.currentTeam$.pipe(
			switchMap(team => {
				if (!team) return throwError(() => Error('No current team'))
				return this.teamsApiService.getTeamInvitation(team.id)
			}),
			catchError(() => {
				this.toastrService.open('Failed to get team link')
				return throwError(() => Error('No current team'))
			})
		)
	}

	public joinTeamByLink(token: string) {
		return this.teamsApiService.joinTeamByLink(token)
	}

	public assignCurrentTeam(team: Teams) {
		this.currentTeamSubject.next(team)

		this.authService.user$
			.pipe(
				switchMap(user => {
					if (user) {
						return this.teamsApiService.getTeamMemberByUserId(team.id, user.id)
					}

					return throwError(() => Error('No current user'))
				}),
				take(1)
			)
			.subscribe(teamMember => {
				this.currentTeamMemberSubject.next(teamMember)
			})
	}
}
