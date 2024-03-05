import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from 'src/app/shared/shared.module'

import { BannerComponent } from './components/banner/banner.component'
import { FeaturesComponent } from './components/features/features.component'
import { FooterComponent } from './components/footer/footer.component'
import { NavbarComponent } from './components/navbar/navbar.component'
import { TeamsComponent } from './components/teams/teams.component'
import { LandingComponent } from './landing.component'

@NgModule({
	declarations: [
		LandingComponent,
		NavbarComponent,
		BannerComponent,
		FeaturesComponent,
		TeamsComponent,
		FooterComponent,
	],
	imports: [CommonModule, SharedModule, RouterModule],
	exports: [LandingComponent],
})
export class LandingModule {}
