import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { VerificationComponent } from './pages/verification/verification.component';
import { VerificationBannerComponent } from './pages/verification-banner/verification-banner.component';
import { TeamsInvitationsComponent } from './pages/teams-invitations/teams-invitations.component';

@NgModule({
  declarations: [SignUpComponent, LoginComponent, VerificationComponent, VerificationBannerComponent, TeamsInvitationsComponent],
  imports: [CommonModule, SharedModule, AuthRoutingModule],
})
export class AuthModule {}
