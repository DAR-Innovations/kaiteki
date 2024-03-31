import { ChangeDetectionStrategy, Component } from '@angular/core'

import { Posts } from '../../models/posts.model'

@Component({
	selector: 'app-posts-favorite',
	templateUrl: './posts-favorite.component.html',
	styleUrls: ['./posts-favorite.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsFavoriteComponent {
	posts: Posts[] = Array(10).fill('posts')
}
