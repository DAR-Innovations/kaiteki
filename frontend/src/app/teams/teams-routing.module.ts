import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { TeamsLayoutComponent } from './components/layout/teams-layout.component'

const routes: Routes = [
	{
		path: '',
		component: TeamsLayoutComponent,
		children: [
			{
				path: '',
				redirectTo: 'dashboard',
				pathMatch: 'full',
			},
			{
				path: 'dashboard',
				loadChildren: () =>
					import('./submodules/dashboard/dashboard.module').then(
						m => m.DashboardModule
					),
			},
			{
				path: 'tasks',
				loadChildren: () =>
					import('./submodules/tasks/tasks.module').then(m => m.TasksModule),
			},
			{
				path: 'posts',
				loadChildren: () =>
					import('./submodules/posts/posts.module').then(m => m.PostsModule),
			},
			{
				path: 'meetings',
				loadChildren: () =>
					import('./submodules/meetings/meetings.module').then(
						m => m.MeetingsModule
					),
			},
			{
				path: 'chats',
				loadChildren: () =>
					import('./submodules/chats/chats.module').then(m => m.ChatsModule),
			},
			{
				path: 'files',
				loadChildren: () =>
					import('./submodules/files/files.module').then(m => m.FilesModule),
			},
		],
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TeamsRoutingModule {}
