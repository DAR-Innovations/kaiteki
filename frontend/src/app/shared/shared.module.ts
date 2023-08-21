import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './ui/button/button.component';
import { TaigaModule } from './taiga.module';
import { PageHeaderComponent } from './components/page-header/page-header.component';

@NgModule({
  declarations: [ButtonComponent, PageHeaderComponent],
  imports: [CommonModule, TaigaModule],
  exports: [ButtonComponent, PageHeaderComponent, TaigaModule],
})
export class SharedModule {}
