import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { PageableRequest, PaginatedResponse } from 'src/app/shared/models/pagination.model'
import { createQueryParams } from 'src/app/shared/utils/request-params.util'

import { TeamMembersFilterDTO } from '../models/team-members-filter.dto'
import { TeamMembersDTO } from '../models/team-members.model'
import { TeamInvitation } from '../models/teams-invitation.model'
import { CreateTeamDTO, Teams, UpdateTeamDTO } from '../models/teams.model'

@Injectable({
	providedIn: 'root',
})
export class TeamsApiService {
	private readonly baseUrl: string = '/api/v1/teams'

	constructor(private httpClient: HttpClient) {}

	public getTeams() {
		return this.httpClient.get<Teams[]>(this.baseUrl)
	}

	public getTeamById(id: number) {
		return this.httpClient.get<Teams>(`${this.baseUrl}/${id}`)
	}

	public createTeam(dto: CreateTeamDTO) {
		return this.httpClient.post<void>(this.baseUrl, dto)
	}

	public updateTeam(id: number, dto: UpdateTeamDTO) {
		return this.httpClient.put<void>(`${this.baseUrl}/${id}`, dto)
	}

	public deleteTeam(id: number) {
		return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
	}

	public deleteTeamMember(teamId: number, memberId: number) {
		return this.httpClient.delete<void>(`${this.baseUrl}/${teamId}/members/${memberId}`)
	}

	public getTeamInvitation(id: number) {
		return this.httpClient.get<TeamInvitation>(`${this.baseUrl}/invitations/${id}`)
	}

	public searchTeamMembers(id: number, pageable: PageableRequest, filter: TeamMembersFilterDTO) {
		return this.httpClient.get<PaginatedResponse<TeamMembersDTO[]>>(
			`${this.baseUrl}/${id}/members`,
			{ params: createQueryParams({ ...pageable, ...filter }) },
		)
	}

	public getAllTeamMembers(teamId: number, excludeCurrentMember: boolean) {
		return this.httpClient.get<TeamMembersDTO[]>(`${this.baseUrl}/${teamId}/members/all`, {
			params: {
				excludeCurrentMember: excludeCurrentMember,
			},
		})
	}

	public getTeamMemberByUserId(teamId: number, memberId: number) {
		return this.httpClient.get<TeamMembersDTO>(`${this.baseUrl}/${teamId}/members/user/${memberId}`)
	}

	public joinTeamByLink(token: string) {
		return this.httpClient.post<void>(`${this.baseUrl}/invitations/join/${token}`, {})
	}
}
