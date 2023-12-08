import { Observable, of } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateNoteDTO } from '../models/create-note.dto';
import { Notes } from '../models/note.type';
import { UpdateNoteDTO } from '../models/update-note.dto';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private baseURL: string = '/api/v1/notes';

  constructor(private httpClient: HttpClient) {}

  getNote(id: number): Observable<HttpResponse<Notes>> {
    const notes: any[] = [
      {
        id: 1,
        title: 'Hello World',
        content:
          '<h2 class="ql-align-center">Hello World</h2><p class="ql-align-center">&nbsp;</p><p class="ql-align-justify">Today I would like to share with you this information</p><p class="ql-align-justify">dadadadasd</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><br></p><ul><li class="ql-align-justify">21231312</li></ul><p class="ql-align-justify"><br></p><ol><li class="ql-align-justify">312312312sda</li></ol><p class="ql-align-justify"><br></p><p class="ql-align-right">dasdasdasdassdasdasdsada</p><p class="ql-align-right"><br></p><p class="ql-align-right"><a href="http://localhost:4200/asdasdas" rel="noopener noreferrer" target="_blank">sadada</a></p><p><br></p>',
      },
      {
        id: 2,
        title: 'The second assignment',
        content:
          '<h3>The second Assignment</h3><p>&nbsp;</p><p>List:<br>1. Go to Shop</p><p>2. Lets Go to school</p><p>&nbsp;</p>',
      },
      {
        id: 3,
        title: 'The third one',
        content:
          '<h2 style="text-align:right;">The thrid one</h2><p style="text-align:right;">&nbsp;</p><blockquote><p style="text-align:justify;">The using quotes</p></blockquote><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">Using LINKS - <a href="https://stackoverflow.com/questions/2989263/disable-auto-zoom-in-input-text-tag-safari-on-iphone">link</a></p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;"><mark class="marker-yellow">I want to implement also higlihjtinh</mark></p><p style="text-align:justify;">&nbsp;</p>',
      },
    ];

    return of(new HttpResponse({ body: notes.find((note) => note.id === id) }));
  }

  getNotes(): Observable<HttpResponse<Notes[]>> {
    const notes: Notes[] = [
      {
        id: 1,
        title: 'Hello World',
        content:
          '<h2 class="ql-align-center">Hello World</h2><p class="ql-align-center">&nbsp;</p><p class="ql-align-justify">Today I would like to share with you this information</p><p class="ql-align-justify">dadadadasd</p><p class="ql-align-justify"><br></p><p class="ql-align-justify"><br></p><ul><li class="ql-align-justify">21231312</li></ul><p class="ql-align-justify"><br></p><ol><li class="ql-align-justify">312312312sda</li></ol><p class="ql-align-justify"><br></p><p class="ql-align-right">dasdasdasdassdasdasdsada</p><p class="ql-align-right"><br></p><p class="ql-align-right"><a href="http://localhost:4200/asdasdas" rel="noopener noreferrer" target="_blank">sadada</a></p><p><br></p>',
        createdAt: new Date(),
      },
      {
        id: 2,
        title: 'The second assignment',
        content:
          '<h3>The second Assignment</h3><p>&nbsp;</p><p>List:<br>1. Go to Shop</p><p>2. Lets Go to school</p><p>&nbsp;</p>',
        createdAt: new Date(),
      },
      {
        id: 3,
        title: 'The third one',
        content:
          '<h2 style="text-align:right;">The thrid one</h2><p style="text-align:right;">&nbsp;</p><blockquote><p style="text-align:justify;">The using quotes</p></blockquote><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;">Using LINKS - <a href="https://stackoverflow.com/questions/2989263/disable-auto-zoom-in-input-text-tag-safari-on-iphone">link</a></p><p style="text-align:justify;">&nbsp;</p><p style="text-align:justify;"><mark class="marker-yellow">I want to implement also higlihjtinh</mark></p><p style="text-align:justify;">&nbsp;</p>',
        createdAt: new Date(),
      },
    ];

    return of(new HttpResponse({ body: notes }));
  }

  updateNote(id: number, dto: UpdateNoteDTO) {
    return this.httpClient.put<HttpResponse<void>>(`${this.baseURL}/${id}`, dto);
  }

  createNote(dto: CreateNoteDTO): Observable<HttpResponse<number>> {
    return this.httpClient.post<HttpResponse<number>>(`${this.baseURL}`, dto);
  }


  demo() {
    return this.httpClient.get("/api/v1/demo/secured")
  }
}
