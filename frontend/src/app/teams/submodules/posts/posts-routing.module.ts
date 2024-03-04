import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { PostComponent } from './pages/post/post.component'
import { PostsFavouriteComponent } from './pages/posts-favourite/posts-favourite.component'
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
		component: PostsFavouriteComponent,
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PostsRoutingModule {}
