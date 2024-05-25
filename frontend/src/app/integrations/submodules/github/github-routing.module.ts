import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GithubDashboardComponent } from './pages/github-dashboard/github-dashboard.component'
import { GithubRepoComponent } from './pages/github-repo/github-repo.component'

const routes: Routes = [
	{
		path: '',
		component: GithubDashboardComponent,
		title: 'GitHub Dashboard | Kaiteki',
	},
	{
		path: ':owner/:repoName',
		component: GithubRepoComponent,
		title: 'GitHub Repository | Kaiteki',
	},
	// {
	// 	path: 'auth',
	// 	component: GithubAuthComponent,
	// 	title: 'GitHub Auth | Kaiteki',
	// },
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class GithubRoutingModule {}
