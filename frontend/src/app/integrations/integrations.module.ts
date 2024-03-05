import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from '../shared/shared.module'

import { IntegrationsRoutingModule } from './integrations-routing.module'
import { IntegrationsLayoutComponent } from './pages/integrations-layout/integrations-layout.component'
import { IntegrationsListComponent } from './pages/integrations-list/integrations-list.component'

@NgModule({
	declarations: [IntegrationsListComponent, IntegrationsLayoutComponent],
	imports: [CommonModule, SharedModule, IntegrationsRoutingModule],
})
export class IntegrationsModule {}
