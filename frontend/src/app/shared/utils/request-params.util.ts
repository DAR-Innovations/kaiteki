import { HttpParams } from '@angular/common/http'
import { Params } from '@angular/router'

type QueryParamsEntity = string | number | boolean

interface QueryParams {
	[key: string]: QueryParamsEntity
}

export function createQueryParams(filterParam: object): HttpParams {
	let param = new HttpParams()
	Object.entries(filterParam).forEach(([key, value]) => {
		if (value) param = param.set(key, value)
	})
	return param
}

export function createQueryParamsOnFilter<T extends object>(filter: T) {
	const queryParams: QueryParams = {}

	for (const key in filter) {
		queryParams[key] = filter[key] as QueryParamsEntity
	}

	return queryParams
}

export function parseQueryParams<T>(queryParams: Params, defaults: T): T {
	const parsedParams: T = { ...defaults }

	for (const key in defaults) {
		if (Object.prototype.hasOwnProperty.call(queryParams, key)) {
			parsedParams[key] = queryParams[key]
		} else if (defaults[key]) {
			parsedParams[key] = defaults[key]
		}
	}

	return parsedParams
}
