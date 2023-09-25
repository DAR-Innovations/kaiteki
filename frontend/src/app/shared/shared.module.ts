import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './ui/button/button.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { MaterialModule } from './mat.module';
import { IconComponent } from './ui/icon/icon.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ButtonComponent, IconComponent, PageHeaderComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ButtonComponent, IconComponent, PageHeaderComponent, MaterialModule],
})
export class SharedModule {}
