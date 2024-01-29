import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsRoutingModule } from './teams-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TeamsLayoutComponent } from './components/layout/teams-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateTeamDialogComponent } from './components/dialogs/create-team-dialog/create-team-dialog.component';

@NgModule({
  declarations: [
    TeamsLayoutComponent,
    NavbarComponent,
    CreateTeamDialogComponent,
  ],
  imports: [CommonModule, TeamsRoutingModule, SharedModule],
  exports: [CreateTeamDialogComponent],
})
export class TeamsModule {}
