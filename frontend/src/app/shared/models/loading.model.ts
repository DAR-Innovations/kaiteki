export interface RequestLoadingState<T = unknown> {
	loading: boolean
	error?: Error | null
	data?: T
}
