import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './ui/button/button.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { MaterialModule } from './material/mat.module';
import { IconComponent } from './ui/icon/icon.component';
import { RichEditorComponent } from './components/rich-editor/rich-editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    ButtonComponent,
    IconComponent,
    PageHeaderComponent,
    RichEditorComponent,
  ],
  imports: [CommonModule, MaterialModule, CKEditorModule],
  exports: [
    ButtonComponent,
    IconComponent,
    RichEditorComponent,
    PageHeaderComponent,
    MaterialModule,
    CKEditorModule,
  ],
})
export class SharedModule {}
