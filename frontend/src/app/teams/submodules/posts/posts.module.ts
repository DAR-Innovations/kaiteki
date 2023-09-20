import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './pages/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PostsComponent],
  imports: [CommonModule, SharedModule],
})
export class PostsModule {}
