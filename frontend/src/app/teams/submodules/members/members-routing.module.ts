import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MemberDetailsComponent } from './pages/member-details/member-details.component'
import { MembersListComponent } from './pages/members-list/members-list.component'

const routes: Routes = [
	{
		path: '',
		component: MembersListComponent,
		title: 'Members | Kaiteki',
	},
	{
		path: ':id',
		component: MemberDetailsComponent,
		title: 'Member Details | Kaiteki',
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MembersRoutingModule {}
