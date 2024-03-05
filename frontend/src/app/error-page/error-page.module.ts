import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared/shared.module'

import { ErrorPageComponent } from './error-page.component'

@NgModule({
	declarations: [ErrorPageComponent],
	imports: [CommonModule, SharedModule, RouterModule],
})
export class ErrorPageModule {}
