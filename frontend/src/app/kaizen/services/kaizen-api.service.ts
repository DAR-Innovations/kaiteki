import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import {
	KAIZEN_MODES,
	KaizenRequest,
	KaizenResponse,
} from '../models/kaizen.dto'

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

	getKaizenResponse(dto: KaizenRequest, mode: KAIZEN_MODES) {
		switch (mode) {
			case KAIZEN_MODES.CHATBOT:
				return this.promptChatbot(dto)
			case KAIZEN_MODES.KEYWORDS:
				return this.extractKeywords(dto)
			case KAIZEN_MODES.SUMMARIZE:
				return this.summarizeText(dto)
			default:
				return undefined
		}
	}
}
