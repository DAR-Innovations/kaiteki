import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { environment } from 'src/environments/environment'

import { TelegramLinkDTO } from '../models/telegram.dto.model'

@Injectable({
	providedIn: 'root',
})
export class TelegramService {
	private readonly baseUrl = `${environment.apiUrl}/api/v1/integrations/telegram`

	constructor(private httpClient: HttpClient) {}

	connectIntegration() {
		return this.httpClient.post<void>(`${this.baseUrl}/connect`, {})
	}

	disconnectIntegration() {
		return this.httpClient.delete<void>(`${this.baseUrl}/disconnect`, {})
	}

	getBotLink() {
		return this.httpClient.get<TelegramLinkDTO>(`${this.baseUrl}/link`)
	}
}
