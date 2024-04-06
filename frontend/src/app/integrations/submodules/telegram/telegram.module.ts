import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'

import { TelegramDashboardComponent } from './pages/telegram-dashboard/telegram-dashboard.component'
import { TelegramRoutingModule } from './telegram-routing.module'

@NgModule({
	declarations: [TelegramDashboardComponent],
	imports: [CommonModule, SharedModule, TelegramRoutingModule],
})
export class TelegramModule {}
