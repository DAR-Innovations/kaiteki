import { Injectable } from '@angular/core'
import { EventsAPIService } from './events-api.service'

@Injectable({
	providedIn: 'root',
})
export class EventsService {
	constructor(private eventsAPIService: EventsAPIService) {}

	public getEvents() {
		return this.eventsAPIService.getEvents()
	}
}
