import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { PageableRequest, PaginatedResponse } from 'src/app/shared/models/pagination.model'
import { createQueryParams } from 'src/app/shared/utils/request-params.util'

import { CreateMeetingDTO, UpdateMeetingDTO } from '../models/meetings.dto'
import { MeetingsDTO, MeetingsFilter } from '../models/meetings.types'

@Injectable({
	providedIn: 'root',
})
export class MeetingsApiService {
	private readonly baseUrl: string = '/api/v1/meetings'

	constructor(private httpClient: HttpClient) {}

	getMeetings(teamId: number, filter: MeetingsFilter, pageable: PageableRequest) {
		const params = {
			...filter,
			...pageable,
			teamId,
		}

		return this.httpClient.get<PaginatedResponse<MeetingsDTO[]>>(`${this.baseUrl}`, {
			params: createQueryParams(params),
		})
	}

	getMeeting(teamId: number, meetingId: number) {
		return this.httpClient.get<MeetingsDTO>(`${this.baseUrl}/${meetingId}`, {
			params: createQueryParams({ teamId }),
		})
	}

	createMeeting(teamId: number, dto: CreateMeetingDTO) {
		return this.httpClient.post<MeetingsDTO>(`${this.baseUrl}`, dto, {
			params: createQueryParams({ teamId }),
		})
	}

	deleteMeeting(teamId: number, meetingId: number) {
		return this.httpClient.delete<void>(`${this.baseUrl}/${meetingId}`, {
			params: createQueryParams({ teamId }),
		})
	}

	joinMeeting(teamId: number, meetingId: number) {
		return this.httpClient.post<void>(
			`${this.baseUrl}/${meetingId}/join`,
			{},
			{
				params: createQueryParams({ teamId }),
			},
		)
	}

	leaveMeeting(teamId: number, meetingId: number) {
		return this.httpClient.post<void>(
			`${this.baseUrl}/${meetingId}/leave`,
			{},
			{
				params: createQueryParams({ teamId }),
			},
		)
	}

	updateMeeting(teamId: number, meetingId: number, dto: UpdateMeetingDTO) {
		return this.httpClient.put<void>(`${this.baseUrl}/${meetingId}`, dto, {
			params: createQueryParams({ teamId }),
		})
	}
}
