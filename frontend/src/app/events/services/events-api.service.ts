import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Events } from '../pages/models/events.model'

@Injectable({
	providedIn: 'root',
})
export class EventsAPIService {
	private readonly baseUrl: string = '/api/v1/events'

	constructor(private httpClient: HttpClient) {}

	public getEvents() {
		return this.httpClient.get<Events[]>(this.baseUrl)
	}
}
