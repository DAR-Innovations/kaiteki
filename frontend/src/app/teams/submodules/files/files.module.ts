import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'

import { UploadFileDialogComponent } from './components/dialogs/upload-file-dialog/upload-file-dialog.component'
import { FilesFilterComponent } from './components/files-filter/files-filter.component'
import { FilesToolbarComponent } from './components/files-toolbar/files-toolbar.component'
import { FilesListItemComponent } from './components/views/files-list-view/components/files-list-item/files-list-item.component'
import { FilesListViewComponent } from './components/views/files-list-view/files-list-view.component'
import { FilesTableViewComponent } from './components/views/files-table-view/files-table-view.component'
import { FilesRoutingModule } from './files-routing.module'
import { FilesListComponent } from './pages/files-list/files-list.component'

@NgModule({
	declarations: [
		FilesListComponent,
		FilesToolbarComponent,
		FilesFilterComponent,
		FilesListViewComponent,
		FilesTableViewComponent,
		FilesListItemComponent,
		UploadFileDialogComponent,
	],
	imports: [CommonModule, SharedModule, FilesRoutingModule],
})
export class FilesModule {}
