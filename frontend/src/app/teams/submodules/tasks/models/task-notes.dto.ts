export interface TaskNotesDTO {
	id: number
	authorFullName: string
	createdDate: Date
	content: string
	teamMemberId: number
}

export interface CreateTaskNotesDTO {
	content: string
}
