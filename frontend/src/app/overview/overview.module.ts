import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from '../shared/shared.module'

import { OverviewPerformanceSectionComponent } from './components/overview-performance-section/overview-performance-section.component'
import { OverviewProjectsListComponent } from './components/overview-projects-list/overview-projects-list.component'
import { OverviewSidebarCalendarComponent } from './components/overview-sidebar-calendar/overview-sidebar-calendar.component'
import { OverviewSidebarEventsComponent } from './components/overview-sidebar-events/overview-sidebar-events.component'
import { OverviewTasksSectionComponent } from './components/overview-tasks-section/overview-tasks-section.component'
import { OverviewTeamsListComponent } from './components/overview-teams-list/overview-teams-list.component'
import { OverviewRoutingModule } from './overview-routing.module'
import { OverviewHomeComponent } from './pages/overview-home/overview-home.component'

@NgModule({
	declarations: [
		OverviewHomeComponent,
		OverviewTeamsListComponent,
		OverviewPerformanceSectionComponent,
		OverviewTasksSectionComponent,
		OverviewSidebarEventsComponent,
		OverviewSidebarCalendarComponent,
		OverviewProjectsListComponent,
	],
	imports: [CommonModule, SharedModule, OverviewRoutingModule],
})
export class OverviewModule {}
