import { HttpClient, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Observable, of } from 'rxjs'

import { createQueryParams } from 'src/app/shared/utils/request-params.util'

import { CreateNoteDTO } from '../models/create-note.dto'
import { NotesFilterDTO } from '../models/note-filter.dto'
import { Notes } from '../models/note.type'
import { UpdateNoteDTO } from '../models/update-note.dto'

@Injectable({
	providedIn: 'root',
})
export class NotesService {
	private baseURL: string = '/api/v1/notes'

	constructor(private httpClient: HttpClient) {}

	getNote(id: number) {
		return this.httpClient.get<Notes>(`${this.baseURL}/${id}`)
	}

	getNotes(dto: NotesFilterDTO) {
		return this.httpClient.get<Notes[]>(`${this.baseURL}`, {
			params: createQueryParams(dto),
		})
	}

	deleteNote(id: number) {
		return this.httpClient.delete<void>(`${this.baseURL}/${id}`)
	}

	updateNote(id: number, dto: UpdateNoteDTO) {
		return this.httpClient.put<void>(`${this.baseURL}/${id}`, dto)
	}

	createNote(dto: CreateNoteDTO) {
		return this.httpClient.post<void>(`${this.baseURL}`, dto)
	}
}
