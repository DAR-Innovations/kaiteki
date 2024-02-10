import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Posts } from 'src/app/teams/submodules/posts/models/posts.model';

@Component({
  selector: 'app-post-item[post]',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostItemComponent {
  @Input() post!: Posts;
}
