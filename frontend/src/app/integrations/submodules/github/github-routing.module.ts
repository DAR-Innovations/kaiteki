import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { GithubAuthComponent } from './pages/github-auth/github-auth.component'
import { GithubDashboardComponent } from './pages/github-dashboard/github-dashboard.component'

const routes: Routes = [
	{
		path: '',
		component: GithubDashboardComponent,
		title: 'GitHub Dashboard | Kaiteki',
	},
	{
		path: 'auth',
		component: GithubAuthComponent,
		title: 'GitHub Auth | Kaiteki',
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class GithubRoutingModule {}
