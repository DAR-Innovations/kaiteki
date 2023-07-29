import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsComponent } from './teams.component';
import { TeamsRoutingModule } from './teams-routing.module';



@NgModule({
  declarations: [
    TeamsComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule
  ]
})
export class TeamsModule { }
