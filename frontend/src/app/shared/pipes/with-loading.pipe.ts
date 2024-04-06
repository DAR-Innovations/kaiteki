import { Pipe, PipeTransform } from '@angular/core'

import { Observable, catchError, isObservable, map, of, startWith } from 'rxjs'

import { RequestLoadingState } from '../models/loading.model'

@Pipe({
	name: 'withLoading',
})
export class WithLoadingPipe implements PipeTransform {
	transform<T>(value: Observable<T>): Observable<RequestLoadingState<T>> {
		return isObservable(value)
			? value.pipe(
					map(value => ({ loading: false, data: value, error: null })),
					startWith({ loading: true }),
					catchError(error => of({ loading: false, error })),
				)
			: of({ loading: false })
	}
}
