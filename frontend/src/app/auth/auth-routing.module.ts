import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { LoginComponent } from './pages/login/login.component'
import { SignUpComponent } from './pages/sign-up/sign-up.component'
import { TeamsInvitationsComponent } from './pages/teams-invitations/teams-invitations.component'
import { VerificationBannerComponent } from './pages/verification-banner/verification-banner.component'
import { VerificationComponent } from './pages/verification/verification.component'

const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'signup',
		component: SignUpComponent,
	},
	{
		path: 'auth/verification/:token',
		component: VerificationComponent,
	},
	{
		path: 'auth/verification',
		component: VerificationBannerComponent,
	},
	{
		path: 'teams/invitation/:invitationToken',
		component: TeamsInvitationsComponent,
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
