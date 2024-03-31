import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { SpotifyArtistSimplified, SpotifyPlaylistTrack } from '../../models/spotify.model'

@Component({
	selector: 'app-playlist-songs',
	templateUrl: './playlist-songs.component.html',
	styleUrls: ['./playlist-songs.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistSongsComponent {
	@Input() songs: SpotifyPlaylistTrack[] = []

	getTrackArtistsNames(artists: SpotifyArtistSimplified[]) {
		return artists.map(a => a.name).join(', ')
	}
	formatMsToMinutes(ms: number) {
		const seconds = Math.floor(ms / 1000)

		const minutes = Math.floor(seconds / 60)
		const remainingSeconds = seconds % 60

		const formattedMinutes = minutes.toString().padStart(2, '0')
		const formattedSeconds = remainingSeconds.toString().padStart(2, '0')

		return `${formattedMinutes}:${formattedSeconds}`
	}
}
