import { Injectable } from '@angular/core'

import { Subject, startWith, switchMap } from 'rxjs'

import { IntegrationsApiService } from './integrations-api.service'

@Injectable({
	providedIn: 'root',
})
export class IntegrationsService {
	private refreshSubject = new Subject<void>()
	refresh$ = this.refreshSubject.asObservable()

	integrations$ = this.refresh$.pipe(
		startWith(null),
		switchMap(() => this.getUserIntegrations()),
	)

	constructor(private integrationsApiService: IntegrationsApiService) {}

	public getUserIntegrations() {
		return this.integrationsApiService.getUserIntegrations()
	}

	public getUserIntegrationCredentials() {
		return this.integrationsApiService.getUserIntegrationCredentials()
	}

	public refreshIntegrations() {
		this.refreshSubject.next()
	}
}
