import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './pages/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostsRoutingModule } from './posts-routing.module';
import { PostItemComponent } from './components/views/posts-list-view/components/post-item/post-item.component';
import { PostsListViewComponent } from './components/views/posts-list-view/posts-list-view.component';
import { PostsFavouriteComponent } from './pages/posts-favourite/posts-favourite.component';
import { CreatePostDialogComponent } from './components/dialogs/create-post-dialog/create-post-dialog.component';
import { QuillModule } from 'ngx-quill';
import { PostsToolbarComponent } from './components/posts-toolbar/posts-toolbar.component';
import { PostsFilterComponent } from './components/posts-filter/posts-filter.component';
import { PostComponent } from './pages/post/post.component';
import { UpdatePostDialogComponent } from './components/dialogs/update-post-dialog/update-post-dialog.component';

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
