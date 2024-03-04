export interface UploadFileDTO {
	file: File
}

export interface AppFiles {
	id: number
	guid: string
	filename: string
	contentType: string
	size: number
	createdDate: Date
}
