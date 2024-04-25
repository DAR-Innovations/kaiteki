import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { TelegramDashboardComponent } from './pages/telegram-dashboard/telegram-dashboard.component'

const routes: Routes = [
	{
		path: '',
		component: TelegramDashboardComponent,
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TelegramRoutingModule {}
