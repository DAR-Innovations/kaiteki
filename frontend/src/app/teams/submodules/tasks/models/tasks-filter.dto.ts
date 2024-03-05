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
