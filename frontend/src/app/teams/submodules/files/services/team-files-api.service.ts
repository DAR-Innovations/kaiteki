import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { PageableRequest, PaginatedResponse } from 'src/app/shared/models/pagination.model'
import { createQueryParams } from 'src/app/shared/utils/request-params.util'

import { TeamFilesFilter, UpdateTeamFileDTO, UploadTeamFileDTO } from '../models/team-files.dto'
import { TeamFiles } from '../models/team-files.model'

@Injectable({
	providedIn: 'root',
})
export class TeamFilesApiService {
	private readonly baseUrl = '/api/v1/team-files'

	constructor(private httpClient: HttpClient) {}

	uploadTeamFile(teamId: number, dto: UploadTeamFileDTO) {
		const formData = new FormData()

		formData.append('file', dto.file)
		formData.append('description', dto.description)

		return this.httpClient.post<void>(`${this.baseUrl}`, formData, {
			params: { teamId: teamId },
		})
	}

	getTeamFiles(teamId: number, pageable: PageableRequest, filter: TeamFilesFilter) {
		const params = {
			teamId: teamId,
			...filter,
			...pageable,
		}

		return this.httpClient.get<PaginatedResponse<TeamFiles[]>>(`${this.baseUrl}`, {
			params: createQueryParams(params),
		})
	}

	deleteTeamFile(teamId: number, id: number) {
		return this.httpClient.delete<void>(`${this.baseUrl}/${id}`, {
			params: { teamId: teamId },
		})
	}

	updateTeamFile(teamId: number, id: number, dto: UpdateTeamFileDTO) {
		return this.httpClient.put<void>(`${this.baseUrl}/${id}`, dto, {
			params: { teamId: teamId },
		})
	}
}
