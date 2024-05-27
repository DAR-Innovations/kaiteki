import { Injectable } from '@angular/core'

import { BehaviorSubject } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class PageHeaderService {
	header: BehaviorSubject<string> = new BehaviorSubject<string>('')
	header$ = this.header.asObservable()

	changeHeader(value: string) {
		this.header.next(value)
	}
}
