import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from '../shared/shared.module'

import { CreateTeamDialogComponent } from './components/dialogs/create-team-dialog/create-team-dialog.component'
import { TeamsLayoutComponent } from './components/layout/teams-layout.component'
import { NavbarComponent } from './components/navbar/navbar.component'
import { TeamsRoutingModule } from './teams-routing.module'

@NgModule({
	declarations: [TeamsLayoutComponent, NavbarComponent, CreateTeamDialogComponent],
	imports: [CommonModule, TeamsRoutingModule, SharedModule],
	exports: [CreateTeamDialogComponent],
})
export class TeamsModule {}
