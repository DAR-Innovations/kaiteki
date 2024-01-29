import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './pages/notes/notes.component';
import { SharedModule } from '../shared/shared.module';
import { NotesSidebarComponent } from './components/notes-sidebar/notes-sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NoteEditComponent } from './pages/note-edit/note-edit.component';
import { QuillModule, QuillModules } from 'ngx-quill';
import { CreateNoteDialogComponent } from './components/dialogs/create-note-dialog/create-note-dialog.component';

@NgModule({
  declarations: [NotesComponent, NotesSidebarComponent, NoteEditComponent, CreateNoteDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    NotesRoutingModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
  ],
})
export class NotesModule {}
