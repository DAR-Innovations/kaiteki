import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsRoutingModule } from './teams-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TeamsLayoutComponent } from './components/layout/teams-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [TeamsLayoutComponent, NavbarComponent],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    SharedModule,
  ],
})
export class TeamsModule {}
