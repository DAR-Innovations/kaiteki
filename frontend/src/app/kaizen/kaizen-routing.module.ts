import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { KaizenHomeComponent } from './pages/kaizen-home/kaizen-home.component'

const routes: Routes = [
	{
		path: '',
		component: KaizenHomeComponent,
		title: 'Kaizen | Kaiteki',
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class KaizenRoutingModule {}
