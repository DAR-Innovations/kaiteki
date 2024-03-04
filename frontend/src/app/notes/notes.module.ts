import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { QuillModule, QuillModules } from 'ngx-quill'

import { SharedModule } from '../shared/shared.module'

import { CreateNoteDialogComponent } from './components/dialogs/create-note-dialog/create-note-dialog.component'
import { NotesSidebarComponent } from './components/notes-sidebar/notes-sidebar.component'
import { NotesRoutingModule } from './notes-routing.module'
import { NoteEditComponent } from './pages/note-edit/note-edit.component'
import { NotesComponent } from './pages/notes/notes.component'

@NgModule({
	declarations: [
		NotesComponent,
		NotesSidebarComponent,
		NoteEditComponent,
		CreateNoteDialogComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		NotesRoutingModule,
		ReactiveFormsModule,
		QuillModule.forRoot(),
	],
})
export class NotesModule {}
