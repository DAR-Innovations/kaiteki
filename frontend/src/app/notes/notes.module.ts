import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './pages/notes/notes.component';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NotesComponent],
  imports: [CommonModule, SharedModule, NotesRoutingModule, QuillModule.forRoot()],
})
export class NotesModule {}
