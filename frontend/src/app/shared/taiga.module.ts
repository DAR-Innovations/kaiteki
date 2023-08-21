import { NgModule } from '@angular/core';
import { TuiDropdownHostModule } from '@taiga-ui/cdk';
import {
  TuiAlertModule,
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiDropdownModule,
  TuiExpandModule,
  TuiHintModule,
  TuiHostedDropdownModule,
  TuiScrollbarModule,
  TuiSvgModule,
  TuiTooltipModule,
} from '@taiga-ui/core';
import { TuiAccordionModule, TuiCarouselModule } from '@taiga-ui/kit';

@NgModule({
  imports: [
    TuiDialogModule,
    TuiAlertModule,
    TuiSvgModule,
    TuiButtonModule,
    TuiAccordionModule,
    TuiDataListModule,
    TuiDropdownModule,
    TuiDropdownHostModule,
    TuiHostedDropdownModule,
    TuiExpandModule,
    TuiScrollbarModule,
    TuiCarouselModule,
    TuiTooltipModule,
    TuiHintModule,
  ],
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
    TuiExpandModule,
    TuiScrollbarModule,
    TuiCarouselModule,
    TuiTooltipModule,
    TuiHintModule,
  ],
})
export class TaigaModule {}
