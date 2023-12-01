import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewHomeComponent } from './pages/overview-home/overview-home.component';

@NgModule({
  declarations: [OverviewHomeComponent],
  imports: [CommonModule, SharedModule, OverviewRoutingModule],
})
export class OverviewModule {}
