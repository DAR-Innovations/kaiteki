import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'

@Component({
	selector: 'app-mobile-sidebar',
	templateUrl: './mobile-sidebar.component.html',
	styleUrls: ['./mobile-sidebar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSidebarComponent implements OnInit {
	open = false

	constructor(private router: Router) {}

	ngOnInit(): void {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.open = false
			}
		})
	}

	toggleMobileSidebar(state: boolean) {
		this.open = state
	}
}
