export interface GetTotalsStatisticsDTO {
	inProgressTasksCount: number
	completedTasksCount: number
	openTasksCount: number
	totalTasksCount: number
	teamMembersCount: number
}

export interface AnalyticsGraphDTO {
	labels: string[]
	data: number[]
}
