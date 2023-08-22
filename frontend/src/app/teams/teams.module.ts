import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamComponent } from './pages/team/team.component';
import { SharedModule } from '../shared/shared.module';
import { ChatsComponent } from './pages/chats/chats.component';
import { MeetingsComponent } from './pages/meetings/meetings.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { PostsComponent } from './pages/posts/posts.component';

@NgModule({
  declarations: [
    TeamComponent,
    ChatsComponent,
    MeetingsComponent,
    TasksComponent,
    PostsComponent,
  ],
  imports: [CommonModule, TeamsRoutingModule, SharedModule],
})
export class TeamsModule {}
