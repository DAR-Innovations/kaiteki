import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { EventsListComponent } from './pages/events-list/events-list.component'

const routes: Routes = [
	{
		path: '',
		component: EventsListComponent,
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class EventsRoutingModule {}
