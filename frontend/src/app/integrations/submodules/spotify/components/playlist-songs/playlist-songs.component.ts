import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-playlist-songs',
  templateUrl: './playlist-songs.component.html',
  styleUrls: ['./playlist-songs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistSongsComponent {

}
