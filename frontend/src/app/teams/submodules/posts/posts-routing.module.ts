import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { PostComponent } from './pages/post/post.component'
import { PostsFavoriteComponent } from './pages/posts-favorite/posts-favorite.component'
import { PostsComponent } from './pages/posts/posts.component'

const routes: Routes = [
	{
		path: '',
		component: PostsComponent,
	},
	{
		path: ':postId',
		component: PostComponent,
	},
	{
		path: 'favourites',
		component: PostsFavoriteComponent,
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PostsRoutingModule {}
