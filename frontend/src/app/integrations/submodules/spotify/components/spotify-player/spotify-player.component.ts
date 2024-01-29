import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { debounceTime, fromEvent, tap } from 'rxjs';

@Component({
  selector: 'app-spotify-player',
  templateUrl: './spotify-player.component.html',
  styleUrls: ['./spotify-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpotifyPlayerComponent {
  // TODO: Change any to song interface
  currentSong: any = { id: 1 };
  currentSongId: string | null = '1';
  isSongPlaying = false;
  volume = 0;
  showPlayer = 'hidden';

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.initializePlayer();
    this.setupVolumeDebounce();
  }

  ngOnDestroy() {
    // Unsubscribe from observables if any
  }

  initializePlayer() {
    // if (this.spotifyService.hasAccessToken()) {
    //   this.spotifyService
    //     .getMyCurrentPlayingTrack()
    //     .subscribe((data) => (this.currentSongId = data.body?.item?.id));
    //   this.spotifyService
    //     .getMyCurrentPlaybackState()
    //     .subscribe((data) => (this.isSongPlaying = data.body?.is_playing));
    //   this.volume = 50;
    //   this.showPlayer = 'block';
    // }
  }

  setupVolumeDebounce() {
    // fromEvent(document, 'volumeChange')
    //   .pipe(
    //     debounceTime(500),
    //     tap((event) => this.spotifyService.setVolume(event.target.value))
    //   )
    //   .subscribe();
  }

  handlePlayPause() {
    // this.spotifyService.getMyCurrentPlaybackState().subscribe((data) => {
    //   if (data.body.is_playing) {
    //     this.spotifyService.pause();
    //     this.isSongPlaying = false;
    //   } else {
    //     this.spotifyService.play();
    //     this.isSongPlaying = true;
    //   }
    // });
  }

  handleVolumeButtons() {
    this.volume = this.volume === 0 ? 50 : 0;
  }
}
