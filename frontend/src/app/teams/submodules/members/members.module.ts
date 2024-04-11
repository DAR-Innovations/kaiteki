import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'

import { MembersFilterComponent } from './components/members-filter/members-filter.component'
import { MembersToolbarComponent } from './components/members-toolbar/members-toolbar.component'
import { MembersCardsViewComponent } from './components/views/members-cards-view/members-cards-view.component'
import { MembersTableViewComponent } from './components/views/members-table-view/members-table-view.component'
import { MembersRoutingModule } from './members-routing.module'
import { MembersListComponent } from './pages/members-list/members-list.component'

@NgModule({
	declarations: [
		MembersListComponent,
		MembersToolbarComponent,
		MembersFilterComponent,
		MembersCardsViewComponent,
		MembersTableViewComponent,
	],
	imports: [CommonModule, SharedModule, MembersRoutingModule],
})
export class MembersModule {}
