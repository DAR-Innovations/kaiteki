import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { createQueryParams } from 'src/app/shared/utils/request-params.util'

import { Events } from '../pages/models/events.model'

import { PageableRequest, PaginatedResponse } from './../../shared/models/pagination.model'

@Injectable({
	providedIn: 'root',
})
export class EventsAPIService {
	private readonly baseUrl: string = '/api/v1/events'

	constructor(private httpClient: HttpClient) {}

	public getEvents() {
		return this.httpClient.get<Events[]>(this.baseUrl)
	}

	public getTeamsEvents(teamId: number, pageable?: PageableRequest) {
		return this.httpClient.get<PaginatedResponse<Events[]>>(`${this.baseUrl}/teams/${teamId}`, {
			params: createQueryParams({ ...pageable }),
		})
	}
}
