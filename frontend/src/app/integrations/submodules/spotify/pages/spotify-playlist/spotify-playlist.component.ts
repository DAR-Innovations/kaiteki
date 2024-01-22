import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-spotify-playlist',
  templateUrl: './spotify-playlist.component.html',
  styleUrls: ['./spotify-playlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpotifyPlaylistComponent {

}
