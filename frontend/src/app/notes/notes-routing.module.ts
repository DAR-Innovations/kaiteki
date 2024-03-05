import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { NoteEditComponent } from './pages/note-edit/note-edit.component'
// CLI imports router
import { NotesComponent } from './pages/notes/notes.component'

const routes: Routes = [
	{
		path: '',
		component: NotesComponent,
	},
	{ path: ':id', component: NoteEditComponent },
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class NotesRoutingModule {}
