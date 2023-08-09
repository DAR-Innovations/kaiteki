import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingLayoutComponent } from './landing-layout.component';
import { RouterModule } from '@angular/router';
import { TuiRootModule } from '@taiga-ui/core';

@NgModule({
  declarations: [LandingLayoutComponent],
  imports: [CommonModule, RouterModule, TuiRootModule],
  exports: [LandingLayoutComponent],
})
export class LandingLayoutModule {}
