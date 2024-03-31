import { Injectable } from '@angular/core'

import { BehaviorSubject } from 'rxjs'

import { KaizenAPIService } from './kaizen-api.service'

@Injectable({
	providedIn: 'root',
})
export class KaizenService {
	private readonly userResponseSubject = new BehaviorSubject<string | null>(null)
	private readonly userRequestSubject = new BehaviorSubject<string | null>(null)
	private readonly isLoadingSubject = new BehaviorSubject<boolean>(false)

	request$ = this.userRequestSubject.asObservable()
	response$ = this.userResponseSubject.asObservable()
	isLoading$ = this.isLoadingSubject.asObservable()

	constructor(private kaizenAPIService: KaizenAPIService) {}

	resetValues() {
		this.userRequestSubject.next('')
		this.userResponseSubject.next('')
		this.isLoadingSubject.next(false)
	}

	setRequest(v: string) {
		this.userRequestSubject.next(v)
	}

	setResponse(v: string) {
		this.userResponseSubject.next(v)
	}

	setLoading(v: boolean) {
		this.isLoadingSubject.next(v)
	}
}
