export interface AnalyticsGraphDTO {
	labels: string[]
	data: number[]
}

export interface UserTotalsStatisticsDTO {
	inProgressTasksCount: number
	completedTasksCount: number
	openTasksCount: number
	totalTasksCount: number
}

export interface TeamsTotalsStatisticsDTO {
	inProgressTasksCount: number
	completedTasksCount: number
	openTasksCount: number
	totalTasksCount: number
	teamMembersCount: number
}
