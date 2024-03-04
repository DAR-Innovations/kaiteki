import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
	selector: 'app-posts-favourite',
	templateUrl: './posts-favourite.component.html',
	styleUrls: ['./posts-favourite.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsFavouriteComponent {
	posts: any[] = Array(10).fill('posts')
}
