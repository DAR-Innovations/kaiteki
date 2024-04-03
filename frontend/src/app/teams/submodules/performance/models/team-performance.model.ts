export interface PerformanceMetricsSettings {
	enabled: boolean
	weight: number
	normalValue: number
	type: PerformanceMetricsType
}

export enum PerformanceMetricsType {
	HIGH_PRIORITY_TASKS = 'HIGH_PRIORITY_TASKS',
	MEDIUM_PRIORITY_TASKS = 'MEDIUM_PRIORITY_TASKS',
	LOW_PRIORITY_TASKS = 'LOW_PRIORITY_TASKS',
	ATTENDANT_MEETINGS = 'ATTENDANT_MEETINGS',
	SCREEN_TIME_MINUTES = 'SCREEN_TIME_MINUTES',
}

export type PerformanceMetricsTable = {
	[key in PerformanceMetricsType]: PerformanceMetricsTableItem
}

export interface TeamPerformanceMetrics {
	id: string
	updatedDate?: Date
	highPriorityTasks: PerformanceMetricsSettings
	mediumPriorityTasks: PerformanceMetricsSettings
	lowPriorityTasks: PerformanceMetricsSettings
	attendantMeetings: PerformanceMetricsSettings
	screenTimeMinutes: PerformanceMetricsSettings
}

export interface TeamPerformance {
	id: string
	createdDate: Date
	performance: number
}

export interface PerformanceMetricsTableItem {
	type: PerformanceMetricsType
	name: string
	weight: number
	normalValue: number
	description: string
	enabled: boolean
}

export interface UpdateTeamPerformanceMetricsDTO {
	highPriorityTasks: PerformanceMetricsSettings
	mediumPriorityTasks: PerformanceMetricsSettings
	lowPriorityTasks: PerformanceMetricsSettings
	attendantMeetings: PerformanceMetricsSettings
	screenTimeMinutes: PerformanceMetricsSettings
}
