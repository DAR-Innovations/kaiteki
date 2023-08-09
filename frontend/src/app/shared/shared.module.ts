import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './ui/button/button.component';
import { TaigaModule } from './taiga.module';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, TaigaModule],
  exports: [ButtonComponent, TaigaModule],
})
export class SharedModule {}
