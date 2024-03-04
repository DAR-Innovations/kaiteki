import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class SpotifyService {
	constructor() {}

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
