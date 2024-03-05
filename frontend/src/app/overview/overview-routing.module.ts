import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { OverviewHomeComponent } from './pages/overview-home/overview-home.component'

const routes: Routes = [
	{
		path: '',
		component: OverviewHomeComponent,
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class OverviewRoutingModule {}
