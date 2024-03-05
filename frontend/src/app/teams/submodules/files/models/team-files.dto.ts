export interface UploadTeamFileDTO {
	description: string
	file: File
}

export interface TeamFilesFilter {
	searchValue?: string
	view?: string
	sort?: string
}

export interface UpdateTeamFileDTO {
	filename: string
	description: string
}
