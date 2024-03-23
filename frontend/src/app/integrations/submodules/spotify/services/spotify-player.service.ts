import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import {
	SpotifyCurrentlyPlaying,
	SpotifyCurrentlyPlayingContext,
} from '../models/spotify-player.model'

@Injectable({
	providedIn: 'root',
})
export class SpotifyPlayerService {
	private readonly baseUrl = '/api/v1/integrations/spotify/player'

	constructor(private http: HttpClient) {}

	getPlaybackState() {
		return this.http.get<SpotifyCurrentlyPlayingContext>(this.baseUrl)
	}

	setPlaybackVolume(volume: number) {
		return this.http.put<void>(`${this.baseUrl}/volume?volume=${volume}`, {})
	}

	startResumePlayback(trackUri: string) {
		return this.http.post<void>(
			`${this.baseUrl}/start?trackUri=${trackUri}`,
			{}
		)
	}

	pausePlayback() {
		return this.http.post<void>(`${this.baseUrl}/pause`, {})
	}

	getCurrentPlayingTrack() {
		return this.http.get<SpotifyCurrentlyPlaying>(
			`${this.baseUrl}/current-track`
		)
	}

	skipToNextTrack() {
		return this.http.post<void>(`${this.baseUrl}/next`, {})
	}

	skipToPreviousTrack() {
		return this.http.post<void>(`${this.baseUrl}/previous`, {})
	}

	setTrackProgress(positionMs: number) {
		return this.http.put<void>(
			`${this.baseUrl}/progress?positionMs=${positionMs}`,
			{}
		)
	}
}
