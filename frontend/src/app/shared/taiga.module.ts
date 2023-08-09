import { NgModule } from '@angular/core';
import {
  TuiAlertModule,
  TuiButtonModule,
  TuiDialogModule,
  TuiSvgModule,
} from '@taiga-ui/core';

@NgModule({
  exports: [TuiDialogModule, TuiAlertModule, TuiSvgModule, TuiButtonModule],
})
export class TaigaModule {}
