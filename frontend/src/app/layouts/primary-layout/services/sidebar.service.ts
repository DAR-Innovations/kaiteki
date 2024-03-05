import { Injectable } from '@angular/core'

import { BehaviorSubject } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class SidebarService {
	private sidebarCollapsedSubject = new BehaviorSubject<boolean>(true)
	sidebarCollapsedState = this.sidebarCollapsedSubject.asObservable()

	changeSidebarState(state: boolean) {
		this.sidebarCollapsedSubject.next(state)
	}

	toggleSidebarState() {
		this.sidebarCollapsedSubject.next(!this.sidebarCollapsedSubject.getValue())
	}
}
