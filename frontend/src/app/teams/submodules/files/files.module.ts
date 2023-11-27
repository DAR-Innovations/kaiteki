import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesListComponent } from './pages/files-list/files-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilesRoutingModule } from './files-routing.module';
import { FilesToolbarComponent } from './components/files-toolbar/files-toolbar.component';
import { FilesFilterComponent } from './components/files-filter/files-filter.component';
import { FilesListViewComponent } from './components/views/files-list-view/files-list-view.component';
import { FilesTableViewComponent } from './components/views/files-table-view/files-table-view.component';
import { FilesListItemComponent } from './components/views/files-list-view/components/files-list-item/files-list-item.component';
import { UploadFileDialogComponent } from './components/dialogs/upload-file-dialog/upload-file-dialog.component';
import { FileUploadModule } from '@iplab/ngx-file-upload';

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
  imports: [CommonModule, SharedModule, FilesRoutingModule, FileUploadModule],
})
export class FilesModule {}
