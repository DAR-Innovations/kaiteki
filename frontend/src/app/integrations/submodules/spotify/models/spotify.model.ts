export interface SpotifyTrack {
	album: SpotifyAlbumSimplified
	artists: SpotifyArtistSimplified[]
	discNumber: number
	durationMs: number
	explicit: boolean
	externalIds: SpotifyExternalId
	externalUrls: SpotifyExternalUrl
	href: string
	id: string
	isPlayable: boolean
	linkedFrom: SpotifyTrackLink
	restrictions: SpotifyRestrictions
	name: string
	popularity: number
	previewUrl: string
	trackNumber: number
	type: SpotifyModelObjectType
	URI: string
}

export interface SpotifyPlaylist {
	collaborative: boolean
	description: string
	externalUrls: SpotifyExternalUrl
	followers: SpotifyFollowers
	href: string
	id: string
	images: SpotifyImage[]
	name: string
	owner: SpotifyUser
	publicAccess: boolean
	snapshotId: string
	tracks: SpotifyPaging<SpotifyPlaylistTrack>
	type: SpotifyModelObjectType
	uri: string
}

export interface SpotifyPlaylistTrack {
	addedAt: Date
	addedBy: SpotifyUser
	isLocal: boolean
	track: SpotifyTrack
}

export interface SpotifyTrack {
	album: SpotifyAlbumSimplified
	artists: SpotifyArtistSimplified[]
	availableMarkets: SpotifyCountryCode[]
	discNumber: number
	durationMs: number
	explicit: boolean
	externalIds: SpotifyExternalId
	externalUrls: SpotifyExternalUrl
	href: string
	id: string
	isPlayable: boolean
	linkedFrom: SpotifyTrackLink
	restrictions: SpotifyRestrictions
	name: string
	popularity: number
	previewUrl: string
	trackNumber: number
	type: SpotifyModelObjectType
	uri: string
}

export interface SpotifyPaging<T> {
	href: string
	items: T[]
	limit: number
	next: string | null
	offset: number
	previous: string | null
	total: number
}

export interface SpotifyAlbumSimplified {
	id: string
	albumGroup: SpotifyAlbumGroup
	albumType: SpotifyAlbumType
	artists: SpotifyArtistSimplified[]
	externalUrls: SpotifyExternalUrl
	href: string
	images: SpotifyImage[]
	name: string
	releaseDate: string
	releaseDatePrecision: SpotifyReleaseDatePrecision
	restrictions: SpotifyRestrictions
	type: SpotifyModelObjectType
	uri: string
}

export enum SpotifyAlbumType {
	ALBUM = 'album',
	COMPILATION = 'compilation',
	SINGLE = 'single',
}

export enum SpotifyAlbumGroup {
	ALBUM = 'album',
	APPEARS_ON = 'appears_on',
	COMPILATION = 'compilation',
	SINGLE = 'single',
}

enum SpotifyReleaseDatePrecision {
	DAY = 'day',
	MONTH = 'month',
	YEAR = 'year',
}

interface SpotifyImage {
	height: number
	url: string
	width: number
}

interface SpotifyRestrictions {
	reason: string
}

interface SpotifyTrackLink {
	externalUrls: SpotifyExternalUrl
	href: string
	id: string
	type: SpotifyModelObjectType
	uri: string
}

export enum SpotifyModelObjectType {
	ALBUM = 'album',
	ARTIST = 'artist',
	AUDIO_FEATURES = 'audio_features',
	EPISODE = 'episode',
	GENRE = 'genre',
	PLAYLIST = 'playlist',
	SHOW = 'show',
	TRACK = 'track',
	USER = 'user',
}

export interface SpotifyPlaylistSimplified {
	collaborative: boolean
	externalUrls: SpotifyExternalUrl
	href: string
	id: string
	images: SpotifyImage[]
	name: string
	owner: SpotifyUser
	publicAccess: boolean
	snapshotId: string
	tracks: SpotifyPlaylistTracksInformation
	type: SpotifyModelObjectType
	uri: string
}

export interface SpotifyUser {
	birthdate: string
	country: SpotifyCountryCode
	displayName: string
	email: string
	externalUrls: SpotifyExternalUrl
	followers: SpotifyFollowers
	href: string
	id: string
	images: SpotifyImage[]
	product: SpotifyProductType
	type: SpotifyModelObjectType
	uri: string
}

export interface SpotifyCountryCode {
	name: string
}

export enum SpotifyProductType {
	BASIC_DESKTOP = 'basic-desktop',
	DAYPASS = 'daypass',
	FREE = 'free',
	OPEN = 'open',
	PREMIUM = 'premium',
}
export interface SpotifyFollowers {
	href: string
	total: string
}

export interface SpotifyPlaylistTracksInformation {
	href: string
	total: string
}

export interface SpotifyArtistSimplified {
	externalUrls: SpotifyExternalUrl
	href: string
	id: string
	name: string
	type: SpotifyModelObjectType
	uri: string
}

interface SpotifyExternalUrl {
	externalUrls: Map<string, string>
}

interface SpotifyExternalId {
	externalIds: Map<string, string>
}
