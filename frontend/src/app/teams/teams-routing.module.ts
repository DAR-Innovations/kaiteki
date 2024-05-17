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
					import('./submodules/dashboard/dashboard.module').then(m => m.DashboardModule),
				title: 'Team Dashboard | Kaiteki',
			},
			{
				path: 'members',
				loadChildren: () =>
					import('./submodules/members/members.module').then(m => m.MembersModule),
				title: 'Team Members | Kaiteki',
			},
			{
				path: 'tasks',
				loadChildren: () => import('./submodules/tasks/tasks.module').then(m => m.TasksModule),
				title: 'Team Tasks | Kaiteki',
			},
			{
				path: 'posts',
				loadChildren: () => import('./submodules/posts/posts.module').then(m => m.PostsModule),
				title: 'Team Posts | Kaiteki',
			},
			{
				path: 'meetings',
				loadChildren: () =>
					import('./submodules/meetings/meetings.module').then(m => m.MeetingsModule),
				title: 'Team Meetings | Kaiteki',
			},
			{
				path: 'chats',
				loadChildren: () => import('./submodules/chats/chats.module').then(m => m.ChatsModule),
				title: 'Team Chats | Kaiteki',
			},
			{
				path: 'files',
				loadChildren: () => import('./submodules/files/files.module').then(m => m.FilesModule),
				title: 'Team Files | Kaiteki',
			},
			{
				path: 'settings',
				loadChildren: () =>
					import('./submodules/settings/settings.module').then(m => m.SettingsModule),
				title: 'Team Settings | Kaiteki',
			},
		],
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TeamsRoutingModule {}
