import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTeamDTO, Teams, UpdateTeamDTO } from '../models/teams.model';
import { TeamInvitation } from '../models/teams-invitation.model';
import { Paginated, Pagination } from 'src/app/shared/models/pagination.model';
import { TeamMembersFilterDTO } from '../models/team-members-filter.dto';
import { TeamMembersDTO } from '../models/team-members.model';
import { createQueryParams } from 'src/app/shared/utils/request-params.util';

@Injectable({
  providedIn: 'root',
})
export class TeamsApiService {
  private readonly baseUrl: string = '/api/v1/teams';

  constructor(private httpClient: HttpClient) {}

  public getTeams() {
    return this.httpClient.get<Teams[]>(this.baseUrl);
  }

  public getTeamById(id: number) {
    return this.httpClient.get<Teams>(`${this.baseUrl}/${id}`);
  }

  public createTeam(dto: CreateTeamDTO) {
    return this.httpClient.post<void>(this.baseUrl, dto);
  }

  public updateTeam(id: number, dto: UpdateTeamDTO) {
    return this.httpClient.put<void>(`${this.baseUrl}/${id}`, dto);
  }

  public deleteTeam(id: number) {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  public deleteTeamMember(teamId: number, memberId: number) {
    return this.httpClient.delete<void>(
      `${this.baseUrl}/${teamId}/members/${memberId}`
    );
  }

  public getTeamInvitation(id: number) {
    return this.httpClient.get<TeamInvitation>(
      `${this.baseUrl}/invitations/${id}`
    );
  }

  public searchTeamMembers(
    id: number,
    page: Pagination,
    filter: TeamMembersFilterDTO
  ) {
    return this.httpClient.get<Paginated<TeamMembersDTO[]>>(
      `${this.baseUrl}/${id}/members`,
      { params: createQueryParams({ ...page, ...filter }) }
    );
  }

  public getAllTeamMembers(teamId: number) {
    return this.httpClient.get<TeamMembersDTO[]>(
      `${this.baseUrl}/${teamId}/members/all`
    );
  }

  public getTeamMemberByUserId(teamId: number, memberId: number) {
    return this.httpClient.get<TeamMembersDTO>(
      `${this.baseUrl}/${teamId}/members/user/${memberId}`
    );
  }

  public joinTeamByLink(token: string) {
    return this.httpClient.post<void>(
      `${this.baseUrl}/invitations/join/${token}`,
      {}
    );
  }
}
