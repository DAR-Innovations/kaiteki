import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core'

import { Subject, takeUntil } from 'rxjs'

import { PageHeaderService } from 'src/app/shared/components/page-header/page-header.service'

import { AuthService } from 'src/app/auth/services/auth.service'

import { SidebarService } from './../../services/sidebar.service'

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnDestroy {
	private unsubscribe$ = new Subject<void>()

	user$ = this.authService.user$

	constructor(
		private pageHeaderService: PageHeaderService,
		private authService: AuthService,
		private sidebarService: SidebarService,
	) {}

	ngOnDestroy(): void {
		this.unsubscribe$.next()
		this.unsubscribe$.complete()
	}

	toggleDesktopSidebar() {
		this.sidebarService.toggleSidebarState()
	}

	onLogout() {
		this.authService.logout().pipe(takeUntil(this.unsubscribe$)).subscribe()
	}

	get header() {
		return this.pageHeaderService.header.asObservable()
	}
}
