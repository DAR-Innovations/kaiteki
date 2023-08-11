import { NgModule } from '@angular/core';
import { TuiDropdownHostModule } from '@taiga-ui/cdk';
import {
  TuiAlertModule,
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiDropdownModule,
  TuiHostedDropdownModule,
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
    TuiDataListModule,
    TuiDropdownModule,
    TuiDropdownHostModule,
    TuiHostedDropdownModule,
  ],
})
export class TaigaModule {}
