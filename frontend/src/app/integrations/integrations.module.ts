import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntegrationsListComponent } from './pages/integrations-list/integrations-list.component';
import { SharedModule } from '../shared/shared.module';
import { IntegrationsRoutingModule } from './integrations-routing.module';
import { IntegrationsLayoutComponent } from './pages/integrations-layout/integrations-layout.component';

@NgModule({
  declarations: [IntegrationsListComponent, IntegrationsLayoutComponent],
  imports: [CommonModule, SharedModule, IntegrationsRoutingModule],
})
export class IntegrationsModule {}
