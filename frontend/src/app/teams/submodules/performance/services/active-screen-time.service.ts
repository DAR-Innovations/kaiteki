import { DOCUMENT } from '@angular/common'
import { Inject, Injectable, NgZone } from '@angular/core'

import { filter, map, startWith, takeWhile, tap } from 'rxjs/operators'

import { BehaviorSubject, Observable, fromEvent, interval } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class ActiveScreenTimeService {
	private activeTime = 0
	private isVisible = true
	private activeTimeSubject = new BehaviorSubject<number>(0)

	constructor(
		@Inject(DOCUMENT) private document: Document,
		private ngZone: NgZone,
	) {}

	startTracking() {
		this.ngZone.runOutsideAngular(() => {
			fromEvent(document, 'visibilitychange')
				.pipe(
					map(() => this.document.visibilityState === 'visible'),
					startWith(this.document.visibilityState === 'visible'),
					tap(isVisible => (this.isVisible = isVisible)),
				)
				.subscribe()

			fromEvent(document, 'click')
				.pipe(
					filter(() => this.isVisible),
					tap(() => this.updateUserActiveTime()),
				)
				.subscribe()

			fromEvent(document, 'keypress')
				.pipe(
					filter(() => this.isVisible),
					tap(() => this.updateUserActiveTime()),
				)
				.subscribe()

			fromEvent(document, 'mousemove')
				.pipe(
					filter(() => this.isVisible),
					tap(() => this.updateUserActiveTime()),
				)
				.subscribe()

			fromEvent(document, 'scroll')
				.pipe(
					filter(() => this.isVisible),
					tap(() => this.updateUserActiveTime()),
				)
				.subscribe()

			interval(10000)
				.pipe(
					takeWhile(() => this.isVisible),
					tap(() => (this.activeTime += 1)),
					map(() => this.activeTime),
				)
				.subscribe(activeTime => {
					this.activeTimeSubject.next(activeTime)
				})
		})
	}

	getActiveTime(): Observable<number> {
		return this.activeTimeSubject.asObservable()
	}

	resetTimer() {
		this.activeTime = 0
	}

	private updateUserActiveTime() {
		if (this.isVisible) {
			this.activeTime = Math.max(this.activeTime, 0)
		}
	}
}
