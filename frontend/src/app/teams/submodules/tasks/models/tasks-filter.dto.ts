export enum TasksViewTypes {
	KANBAN = 'KANBAN',
	LIST = 'LIST',
	TABLE = 'TABLE',
}

export interface TasksFilterDTO {
	searchValue?: string
	view?: string
	executorId?: number
}

export interface TasksExportDTO {
	startDate?: string
	endDate?: string
	executorId?: number
	format?: string
}
