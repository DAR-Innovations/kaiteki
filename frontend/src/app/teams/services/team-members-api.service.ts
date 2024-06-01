import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { TeamMembersDTO } from '../models/team-members.model'

@Injectable({
	providedIn: 'root',
})
export class TeamMembersApiService {
	private readonly baseUrl: string = '/api/v1/members'

	constructor(private httpClient: HttpClient) {}

	public getTeamMemberById(memberId: number) {
		return this.httpClient.get<TeamMembersDTO>(`${this.baseUrl}/${memberId}`)
	}
}
