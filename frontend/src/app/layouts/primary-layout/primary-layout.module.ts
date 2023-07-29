import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryLayoutComponent } from './primary-layout.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PrimaryLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ], 
  exports: [
    PrimaryLayoutComponent
  ]
})
export class PrimaryLayoutModule { }
