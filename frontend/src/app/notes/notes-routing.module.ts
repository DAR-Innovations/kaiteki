import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { NotesComponent } from './pages/notes/notes.component';
import { NoteEditComponent } from './pages/note-edit/note-edit.component';

const routes: Routes = [
  {
    path: '',
    component: NotesComponent,
  },
  { path: ':id', component: NoteEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesRoutingModule {}
