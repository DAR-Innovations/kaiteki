import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { SpotifyLoginDTO } from '../models/spotify-dto.model'
import { SpotifyTrack } from '../models/spotify.model'

@Injectable({
	providedIn: 'root',
})
export class SpotifyService {
	private readonly baseUrl = '/api/v1/integrations/spotify'

	constructor(private httpClient: HttpClient) {}

	getSpotifyLogin() {
		return this.httpClient.get<SpotifyLoginDTO>(`${this.baseUrl}/login`)
	}

	handleAuth(code: string) {
		return this.httpClient.get<void>(`${this.baseUrl}/auth?code=${code}`)
	}

	getUserTopTracks() {
		return this.httpClient.get<SpotifyTrack[]>(
			`${this.baseUrl}/user-top-tracks`
		)
	}

	getMyCurrentPlaybackState() {
		throw new Error('Method not implemented.')
	}
	play() {
		throw new Error('Method not implemented.')
	}
	pause() {
		throw new Error('Method not implemented.')
	}
	setVolume(value: any): void {
		throw new Error('Method not implemented.')
	}
	hasAccessToken() {
		throw new Error('Method not implemented.')
	}
	getMyCurrentPlayingTrack() {
		throw new Error('Method not implemented.')
	}
}
