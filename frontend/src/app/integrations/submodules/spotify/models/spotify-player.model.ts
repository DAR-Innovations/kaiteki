import { SpotifyExternalUrl, SpotifyModelObjectType, SpotifyTrack } from './spotify.model'

export interface SpotifyCurrentlyPlaying {
	device: SpotifyDevice
	repeat_state: string
	shuffle_state: boolean
	context: SpotifyContext
	timestamp: number
	progress_ms: number
	is_playing: boolean
	item: SpotifyTrack
	currentlyPlayingType: SpotifyCurrentlyPlayingType
}

export interface SpotifyCurrentlyPlayingContext {
	device: SpotifyDevice
	repeat_state: string
	shuffle_state: boolean
	context: SpotifyContext
	timestamp: number
	progress_ms: number
	is_playing: boolean
	item: SpotifyTrack
	currentlyPlayingType: SpotifyCurrentlyPlayingType
}

export interface SpotifyDevice {
	id: string
	is_active: boolean
	is_private_session: boolean
	is_restricted: boolean
	name: string
	type: string
	volume_percent: number
}

export enum SpotifyCurrentlyPlayingType {
	TRACK = 'track',
	EPISODE = 'episode',
	AD = 'ad',
	UNKNOWN = 'unknown',
}

export interface SpotifyContext {
	type: SpotifyModelObjectType
	href: string
	externalUrls: SpotifyExternalUrl
	uri: string
}
