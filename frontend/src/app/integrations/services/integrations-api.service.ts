import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { environment } from 'src/environments/environment'

import { IntegrationCredentialsDTO, IntegrationsDTO } from '../models/integrations-dto'

@Injectable({
	providedIn: 'root',
})
export class IntegrationsApiService {
	private readonly baseUrl = `${environment.apiUrl}/api/v1/integrations`

	constructor(private httpClient: HttpClient) {}

	public getUserIntegrations() {
		return this.httpClient.get<IntegrationsDTO>(this.baseUrl)
	}

	public getUserIntegrationCredentials() {
		return this.httpClient.get<IntegrationCredentialsDTO>(`${this.baseUrl}/credentials`)
	}
}
