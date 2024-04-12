import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MembersListComponent } from './pages/members-list/members-list.component'

const routes: Routes = [
	{
		path: '',
		component: MembersListComponent,
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MembersRoutingModule {}
