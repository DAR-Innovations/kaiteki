import { ChangeDetectionStrategy, Component } from '@angular/core'

import { PRIMARY_SIDEBAR_LINKS } from 'src/app/shared/constants/pages-links'

import { SidebarService } from '../../services/sidebar.service'

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
	sidebarPages = Object.entries(PRIMARY_SIDEBAR_LINKS).map(([, value]) => value)
	collapsed$ = this.sidebarService.sidebarCollapsedState

	constructor(private sidebarService: SidebarService) {}
}
