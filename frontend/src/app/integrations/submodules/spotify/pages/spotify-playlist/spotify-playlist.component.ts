import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { EMPTY, catchError, throwError } from 'rxjs'

import { ToastService } from 'src/app/shared/services/toast.service'

import { PLAYLIST_BACKGROUND_COLORS } from '../../constants/playlist-backgrounds'
import { SpotifyService } from '../../services/spotify.service'

@Component({
	selector: 'app-spotify-playlist',
	templateUrl: './spotify-playlist.component.html',
	styleUrls: ['./spotify-playlist.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpotifyPlaylistComponent {
	playlist$ = this.getPlaylist()

	constructor(
		private route: ActivatedRoute,
		private spotifyService: SpotifyService,
		private toastService: ToastService
	) {}

	getRandomBackgroundColor() {
		const randomIndex = Math.floor(
			Math.random() * PLAYLIST_BACKGROUND_COLORS.length
		)

		const randomColor = PLAYLIST_BACKGROUND_COLORS[randomIndex]

		return `linear-gradient(to bottom, ${randomColor}, #f8f9fa)`
	}

	private getPlaylist() {
		const id = this.route.snapshot.paramMap.get('playlistId')

		if (!id) {
			this.toastService.open('Playlist id is not found')
			return EMPTY
		}

		return this.spotifyService.getPlaylistDetailsById(id).pipe(
			catchError(err => {
				this.toastService.open('Failed to get playlist')
				throwError(() => err)
				return EMPTY
			})
		)
	}
}
