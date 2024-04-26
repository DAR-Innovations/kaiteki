import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { AppFiles, UploadFileDTO } from '../models/files.dto'

@Injectable({
	providedIn: 'root',
})
export class FilesService {
	private readonly baseUrl = '/api/v1/files'

	constructor(private httpClient: HttpClient) {}

	uploadFile(dto: UploadFileDTO) {
		const formData = new FormData()
		formData.append('file', dto.file)

		return this.httpClient.post<void>(`${this.baseUrl}`, formData)
	}

	getFileInfo(id: number) {
		return this.httpClient.get<AppFiles>(`${this.baseUrl}/${id}/info`)
	}

	downloadFile(id: number) {
		window.open(`${this.baseUrl}/${id}`, '_blank')
	}

	getFileBlob(id: number) {
		return this.httpClient.get(`${this.baseUrl}/${id}`, {
			responseType: 'blob',
		})
	}

	deleteFile(id: number) {
		return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
	}

	downloadBlob(blob: Blob): void {
		const url = window.URL.createObjectURL(blob)
		window.open(url, '_blank')
	}
}
