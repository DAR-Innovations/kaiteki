import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { SpotifyLoginDTO } from '../models/spotify-dto.model'
import { SpotifyPlaylist, SpotifyPlaylistSimplified } from '../models/spotify.model'

@Injectable({
	providedIn: 'root',
})
export class SpotifyService {
	private readonly baseUrl = '/api/v1/integrations/spotify'

	constructor(private httpClient: HttpClient) {}

	getConnectIntegrationUrl() {
		return this.httpClient.get<SpotifyLoginDTO>(`${this.baseUrl}/connect`)
	}

	disconnectSpotifyIntegration() {
		return this.httpClient.delete<void>(`${this.baseUrl}/disconnect`)
	}

	handleAuthCode(code: string) {
		return this.httpClient.get<void>(`${this.baseUrl}/auth?code=${code}`)
	}

	getUsersSavedPlaylists() {
		return this.httpClient.get<SpotifyPlaylistSimplified[]>(`${this.baseUrl}/playlists/saved`)
	}

	getPlaylistsByCategory(categoryId: string) {
		return this.httpClient.get<SpotifyPlaylistSimplified[]>(
			`${this.baseUrl}/playlists/category/${categoryId}`,
		)
	}

	getPlaylistDetailsById(playlistId: string) {
		return this.httpClient.get<SpotifyPlaylist>(`${this.baseUrl}/playlists/${playlistId}`)
	}
}
