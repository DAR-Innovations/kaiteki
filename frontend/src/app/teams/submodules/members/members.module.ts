import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'

import { MemberDetailsInfoComponent } from './components/member-details-info/member-details-info.component'
import { MemberPerformanceSectionComponent } from './components/member-performance-section/member-performance-section.component'
import { MemberTasksSectionComponent } from './components/member-tasks-section/member-tasks-section.component'
import { MembersFilterComponent } from './components/members-filter/members-filter.component'
import { MembersToolbarComponent } from './components/members-toolbar/members-toolbar.component'
import { MembersCardsViewComponent } from './components/views/members-cards-view/members-cards-view.component'
import { MembersTableViewComponent } from './components/views/members-table-view/members-table-view.component'
import { MembersRoutingModule } from './members-routing.module'
import { MemberDetailsComponent } from './pages/member-details/member-details.component'
import { MembersListComponent } from './pages/members-list/members-list.component'

@NgModule({
	declarations: [
		MembersListComponent,
		MembersToolbarComponent,
		MembersFilterComponent,
		MembersCardsViewComponent,
		MembersTableViewComponent,
		MemberDetailsComponent,
		MemberTasksSectionComponent,
		MemberPerformanceSectionComponent,
		MemberDetailsInfoComponent,
	],
	imports: [CommonModule, SharedModule, MembersRoutingModule],
})
export class MembersModule {}
