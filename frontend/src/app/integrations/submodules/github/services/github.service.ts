import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { CreateGithubCredentials, GithubCredentials } from '../models/github-auth.models'
import { GithubRepoDetails, GithubRepositoryDTO } from '../models/github-dto.models'

@Injectable({
	providedIn: 'root',
})
export class GithubService {
	private readonly baseUrl = `/api/v1/integrations/github`

	constructor(private httpClient: HttpClient) {}

	connectIntegration() {
		return this.httpClient.post<void>(`${this.baseUrl}/connect`, {})
	}

	disconnectIntegration() {
		return this.httpClient.put<void>(`${this.baseUrl}/disconnect`, {})
	}

	getCredentials() {
		return this.httpClient.get<GithubCredentials>(`${this.baseUrl}/credentials`)
	}

	saveCredentials(dto: CreateGithubCredentials) {
		return this.httpClient.post<void>(`${this.baseUrl}/credentials`, dto)
	}

	getRepos() {
		return this.httpClient.get<GithubRepositoryDTO[]>(`${this.baseUrl}/repos`)
	}

	getRepoDetails(repoName: string) {
		return this.httpClient.get<GithubRepoDetails>(`${this.baseUrl}/repos/${repoName.trim()}`)
	}

	// handleAuthCode(code: string) {
	// 	return this.httpClient.get<void>(`${this.baseUrl}/auth?code=${code}`)
	// }
}
