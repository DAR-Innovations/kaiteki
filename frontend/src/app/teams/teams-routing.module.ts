import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsLayoutComponent } from './components/layout/teams-layout.component';

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
        loadChildren: () =>
          import('./submodules/tasks/tasks.module').then((m) => m.TasksModule),
      },
      {
        path: 'posts',
        loadChildren: () =>
          import('./submodules/posts/posts.module').then((m) => m.PostsModule),
      },
      {
        path: 'meetings',
        loadChildren: () =>
          import('./submodules/meetings/meetings.module').then(
            (m) => m.MeetingsModule
          ),
      },
      {
        path: 'chats',
        loadChildren: () =>
          import('./submodules/chats/chats.module').then((m) => m.ChatsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamsRoutingModule {}
