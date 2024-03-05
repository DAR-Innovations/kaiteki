import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core'

import { Subject, takeUntil } from 'rxjs'

import {
	LANDING_NAVBAR_LINKS,
	LANDING_NAVIGATION_LINKS,
} from 'src/app/shared/constants/pages-links'

import { AuthService } from 'src/app/auth/services/auth.service'

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnDestroy {
	private unsubscribe$ = new Subject<void>()

	user$ = this.authService.user$

	navbarPages = LANDING_NAVBAR_LINKS
	navbarPagesArr = Object.entries(LANDING_NAVIGATION_LINKS).map(
		([_, value]) => value
	)

	menuOpen = false

	constructor(private authService: AuthService) {}

	ngOnDestroy(): void {
		this.unsubscribe$.next()
		this.unsubscribe$.complete()
	}

	onToggleMenu() {
		this.menuOpen = !this.menuOpen
	}

	onLogout() {
		this.authService.logout().pipe(takeUntil(this.unsubscribe$)).subscribe()
	}
}
