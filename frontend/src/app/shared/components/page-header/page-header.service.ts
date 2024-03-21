import { Injectable } from '@angular/core'

import { BehaviorSubject } from 'rxjs'

@Injectable({
	providedIn: 'root',
})
export class PageHeaderService {
	header: BehaviorSubject<string> = new BehaviorSubject<string>('')

	changeHeader(value: string) {
		this.header.next(value)
	}
}
