import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { SharedModule } from '../shared/shared.module';
import { OverviewRoutingModule } from './overview-routing.module';

@NgModule({
  declarations: [OverviewComponent],
  imports: [CommonModule, OverviewRoutingModule, SharedModule],
})
export class OverviewModule {}
