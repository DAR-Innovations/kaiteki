import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'

import { GithubRoutingModule } from './github-routing.module'
import { GithubAuthComponent } from './pages/github-auth/github-auth.component'
import { GithubDashboardComponent } from './pages/github-dashboard/github-dashboard.component'
import { githubSessionInterceptorProvider } from './services/github-interceptor.service';
import { GithubRepoComponent } from './pages/github-repo/github-repo.component'

@NgModule({
	declarations: [GithubAuthComponent, GithubDashboardComponent, GithubRepoComponent],
	imports: [CommonModule, SharedModule, GithubRoutingModule],
	providers: [githubSessionInterceptorProvider],
})
export class GithubModule {}
