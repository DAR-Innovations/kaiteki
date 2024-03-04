import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'

import { DashboardFilterComponent } from './components/dashboard-filter/dashboard-filter.component'
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component'
import { DashboardToolbarComponent } from './components/dashboard-toolbar/dashboard-toolbar.component'
import { DashboardInviteDialogComponent } from './components/dialogs/dashboard-invite-dialog/dashboard-invite-dialog.component'
import { DashboardCardsViewComponent } from './components/views/dashboard-cards-view/dashboard-cards-view.component'
import { DashboardTableViewComponent } from './components/views/dashboard-table-view/dashboard-table-view.component'
import { DashboardRoutingModule } from './dashboard-routing.module'
import { DashboardComponent } from './pages/dashboard/dashboard.component'

@NgModule({
	declarations: [
		DashboardComponent,
		DashboardToolbarComponent,
		DashboardTableViewComponent,
		DashboardCardsViewComponent,
		DashboardFilterComponent,
		DashboardInviteDialogComponent,
		DashboardSidebarComponent,
	],
	imports: [CommonModule, SharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
