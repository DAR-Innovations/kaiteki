import { NgModule } from '@angular/core';
import {
  TuiAlertModule,
  TuiButtonModule,
  TuiDialogModule,
  TuiSvgModule,
} from '@taiga-ui/core';
import { TuiAccordionModule } from '@taiga-ui/kit';

@NgModule({
  exports: [
    TuiDialogModule,
    TuiAlertModule,
    TuiSvgModule,
    TuiButtonModule,
    TuiAccordionModule,
  ],
})
export class TaigaModule {}
