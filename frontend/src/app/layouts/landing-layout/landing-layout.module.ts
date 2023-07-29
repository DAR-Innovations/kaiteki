import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingLayoutComponent } from './landing-layout.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LandingLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    LandingLayoutComponent,
  ]
})
export class LandingLayoutModule { }
