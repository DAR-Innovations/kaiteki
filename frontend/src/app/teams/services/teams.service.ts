import { CreateTeamDTO, UpdateTeamDTO } from './../models/teams.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Teams } from '../models/teams.model';
import { TeamInvitation } from '../models/teams-invitation.model';
import { BehaviorSubject, switchMap, tap, throwError } from 'rxjs';
import { TeamMembersDTO } from '../models/team-members.model';
import { TeamMembersFilterDTO } from '../models/team-members-filter.dto';
import { Paginated, Pagination } from 'src/app/shared/models/pagination.model';
import { createQueryParams } from 'src/app/shared/utils/request-params.util';

@Injectable({
  providedIn: 'root',
})
export class TeamsService implements OnDestroy {
  private baseUrl: string = '/api/v1/teams';

  private currentTeamSubject = new BehaviorSubject<Teams | null>(null);
  currentTeam$ = this.currentTeamSubject.asObservable();
  teams$ = this.getTeams();

  constructor(private httpClient: HttpClient) {}

  ngOnDestroy(): void {
    this.currentTeamSubject.next(null);
    this.currentTeamSubject.complete();
  }

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

  public deleteTeamMember(id: number) {
    return this.currentTeam$.pipe(
      tap((team) => {
        if (!team) {
          throwError(() => Error('No current team'));
        }
      }),
      switchMap((team) => {
        return this.httpClient.delete<void>(
          `${this.baseUrl}/${team!.id}/members/${id}`
        );
      })
    );
  }

  public getTeamMembers(page: Pagination, filter: TeamMembersFilterDTO) {
    return this.currentTeam$.pipe(
      tap((team) => {
        if (!team) {
          throwError(() => Error('No current team'));
        }
      }),
      switchMap((team) => {
        return this.getTeamMembersAPI(team!.id, page, filter);
      })
    );
  }

  private getTeamMembersAPI(
    id: number,
    page: Pagination,
    filter: TeamMembersFilterDTO
  ) {
    return this.httpClient.get<Paginated<TeamMembersDTO[]>>(
      `${this.baseUrl}/${id}/members`,
      { params: createQueryParams({ ...page, ...filter }) }
    );
  }

  public getTeamInvitation(id: number) {
    return this.httpClient.get<TeamInvitation>(
      `${this.baseUrl}/invitations/${id}`
    );
  }

  public joinTeamByLink(token: string) {
    return this.httpClient.post<void>(
      `${this.baseUrl}/invitations/join/${token}`,
      {}
    );
  }

  public assignCurrentTeam(team: Teams) {
    this.currentTeamSubject.next(team);
  }
}
