import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './error-page.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ErrorPageComponent],
  imports: [CommonModule, SharedModule, RouterModule],
})
export class ErrorPageModule {}
