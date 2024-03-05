import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from '../shared/shared.module'

import { KaizenRoutingModule } from './kaizen-routing.module'
import { KaizenHomeComponent } from './pages/kaizen-home/kaizen-home.component'

@NgModule({
	declarations: [KaizenHomeComponent],
	imports: [CommonModule, SharedModule, KaizenRoutingModule],
})
export class KaizenModule {}
