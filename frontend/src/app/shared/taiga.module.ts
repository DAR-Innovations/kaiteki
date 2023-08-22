import { NgModule } from '@angular/core';
import { TuiDropdownHostModule, TuiActiveZoneModule } from '@taiga-ui/cdk';
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
import {
  TuiAccordionModule,
  TuiCarouselModule,
  TuiTabsModule,
} from '@taiga-ui/kit';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';

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
    TuiSidebarModule,
    TuiActiveZoneModule,
    TuiTabsModule,
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
    TuiSidebarModule,
    TuiActiveZoneModule,
    TuiTabsModule,
  ],
})
export class TaigaModule {}
