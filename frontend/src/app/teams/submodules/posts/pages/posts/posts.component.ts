import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent {
  posts: any[] = Array(10).fill('posts');
  pinnedPosts: any[] = Array(3).fill('posts');
}
