import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from './pages/team/team.component';
import { TeamsLayoutComponent } from '../layouts/teams-layout/teams-layout.component';
import { TeamsLayoutModule } from '../layouts/teams-layout/teams-layout.module';

const routes: Routes = [
  {
    path: '',
    component: TeamsLayoutComponent,
    children: [
      {
        path: '',
        component: TeamComponent,
      },
    ],
  },
];

@NgModule({
  imports: [TeamsLayoutModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamsRoutingModule {}
