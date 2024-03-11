import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { KaizenRequest, KaizenResponse } from '../models/kaizen.dto'

@Injectable({
	providedIn: 'root',
})
export class KaizenAPIService {
	private baseURL: string = '/kaizen/v1'

	constructor(private httpClient: HttpClient) {}

	summarizeText(dto: KaizenRequest) {
		return this.httpClient.post<KaizenResponse>(
			`${this.baseURL}/summarize`,
			dto
		)
	}

	extractKeywords(dto: KaizenRequest) {
		return this.httpClient.post<KaizenResponse>(`${this.baseURL}/keywords`, dto)
	}

	promptChatbot(dto: KaizenRequest) {
		return this.httpClient.post<KaizenResponse>(`${this.baseURL}/chatbot`, dto)
	}
}
