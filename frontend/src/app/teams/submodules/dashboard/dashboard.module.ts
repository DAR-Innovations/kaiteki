import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'

import { AnalyticsPerformanceSectionComponent } from './components/analytics/analytics-performance-section/analytics-performance-section.component'
import { AnalyticsStatisticsListComponent } from './components/analytics/analytics-statistics-list/analytics-statistics-list.component'
import { AnalyticsTasksSectionComponent } from './components/analytics/analytics-tasks-section/analytics-tasks-section.component'
import { DashboardAnalyticsComponent } from './components/dashboard-analytics/dashboard-analytics.component'
import { DashboardToolbarComponent } from './components/dashboard-toolbar/dashboard-toolbar.component'
import { DashboardInviteDialogComponent } from './components/dialogs/dashboard-invite-dialog/dashboard-invite-dialog.component'
import { SidebarEventsComponent } from './components/sidebar/sidebar-events/sidebar-events.component'
import { SidebarTopMembersComponent } from './components/sidebar/sidebar-top-members/sidebar-top-members.component'
import { DashboardRoutingModule } from './dashboard-routing.module'
import { DashboardComponent } from './pages/dashboard/dashboard.component'

@NgModule({
	declarations: [
		DashboardComponent,
		DashboardToolbarComponent,
		DashboardInviteDialogComponent,
		DashboardAnalyticsComponent,
		AnalyticsStatisticsListComponent,
		AnalyticsTasksSectionComponent,
		AnalyticsPerformanceSectionComponent,
		SidebarTopMembersComponent,
		SidebarEventsComponent,
	],
	imports: [CommonModule, SharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
