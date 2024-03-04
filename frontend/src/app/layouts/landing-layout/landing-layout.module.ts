import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { LandingLayoutComponent } from './landing-layout.component'

@NgModule({
	declarations: [LandingLayoutComponent],
	imports: [CommonModule, RouterModule],
	exports: [LandingLayoutComponent],
})
export class LandingLayoutModule {}
