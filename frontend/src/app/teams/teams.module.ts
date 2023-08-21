import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamComponent } from './pages/team/team.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TeamComponent],
  imports: [CommonModule, TeamsRoutingModule, SharedModule],
})
export class TeamsModule {}
