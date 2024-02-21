import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Posts } from '../../../models/posts.model';

@Component({
  selector: 'app-posts-list-view',
  templateUrl: './posts-list-view.component.html',
  styleUrls: ['./posts-list-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsListViewComponent {
  @Input() posts: Posts[] = [];

  postsTrackBy(_: number, post: Posts) {
    return post.id;
  }
}
