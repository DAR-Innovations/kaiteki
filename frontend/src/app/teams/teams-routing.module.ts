import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from './pages/team/team.component';
import { TeamsLayoutComponent } from '../layouts/teams-layout/teams-layout.component';
import { TeamsLayoutModule } from '../layouts/teams-layout/teams-layout.module';
import { TasksComponent } from './pages/tasks/tasks.component';
import { MeetingsComponent } from './pages/meetings/meetings.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { PostsComponent } from './pages/posts/posts.component';

const routes: Routes = [
  {
    path: '',
    component: TeamsLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      {
        path: 'tasks',
        component: TasksComponent,
      },
      {
        path: 'posts',
        component: PostsComponent,
      },
      {
        path: 'meetings',
        component: MeetingsComponent,
      },
      {
        path: 'chats',
        component: ChatsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [TeamsLayoutModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamsRoutingModule {}
