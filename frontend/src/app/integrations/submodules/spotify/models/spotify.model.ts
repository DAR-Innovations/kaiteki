export interface SpotifyTrack {
	album: AlbumSimplified
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

export interface AlbumSimplified {
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
