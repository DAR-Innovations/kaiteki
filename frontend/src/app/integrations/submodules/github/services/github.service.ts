import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { GithubLoginDTO } from '../models/github-auth.models'

@Injectable({
	providedIn: 'root',
})
export class GithubService {
	private readonly baseUrl = '/api/v1/integrations/github'

	constructor(private httpClient: HttpClient) {}

	getConnectIntegrationUrl() {
		return this.httpClient.get<GithubLoginDTO>(`${this.baseUrl}/connect`)
	}

	disconnectIntegration() {
		return this.httpClient.delete<void>(`${this.baseUrl}/disconnect`)
	}

	handleAuthCode(code: string) {
		return this.httpClient.get<void>(`${this.baseUrl}/auth?code=${code}`)
	}
}
