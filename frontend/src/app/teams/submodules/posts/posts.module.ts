import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './pages/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostsRoutingModule } from './posts-routing.module';
import { PostItemComponent } from './components/post-item/post-item.component';

@NgModule({
  declarations: [PostsComponent, PostItemComponent],
  imports: [CommonModule, SharedModule, PostsRoutingModule],
})
export class PostsModule {}
