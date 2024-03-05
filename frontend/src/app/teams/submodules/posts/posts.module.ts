import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { QuillModule } from 'ngx-quill'

import { SharedModule } from 'src/app/shared/shared.module'

import { CreatePostDialogComponent } from './components/dialogs/create-post-dialog/create-post-dialog.component'
import { UpdatePostDialogComponent } from './components/dialogs/update-post-dialog/update-post-dialog.component'
import { PostsFilterComponent } from './components/posts-filter/posts-filter.component'
import { PostsToolbarComponent } from './components/posts-toolbar/posts-toolbar.component'
import { PostItemComponent } from './components/views/posts-list-view/components/post-item/post-item.component'
import { PostsListViewComponent } from './components/views/posts-list-view/posts-list-view.component'
import { PostComponent } from './pages/post/post.component'
import { PostsFavouriteComponent } from './pages/posts-favourite/posts-favourite.component'
import { PostsComponent } from './pages/posts/posts.component'
import { PostsRoutingModule } from './posts-routing.module'

@NgModule({
	declarations: [
		PostsComponent,
		PostItemComponent,
		PostsListViewComponent,
		PostsFavouriteComponent,
		CreatePostDialogComponent,
		PostsToolbarComponent,
		PostsFilterComponent,
		PostComponent,
		UpdatePostDialogComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		PostsRoutingModule,
		QuillModule.forRoot(),
	],
})
export class PostsModule {}
