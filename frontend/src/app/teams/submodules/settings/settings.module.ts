import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'

import { PerformanceMetricsComponent } from './components/performance-metrics/performance-metrics.component'
import { SettingsLogoSectionComponent } from './components/sections/settings-logo-section/settings-logo-section.component'
import { SettingsPerformanceSectionComponent } from './components/sections/settings-performance-section/settings-performance-section.component'
import { SettingsRenameSectionComponent } from './components/sections/settings-rename-section/settings-rename-section.component'
import { SettingsComponent } from './pages/settings/settings.component'
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsDangerSectionComponent } from './components/sections/settings-danger-section/settings-danger-section.component'

@NgModule({
	declarations: [
		SettingsComponent,
		PerformanceMetricsComponent,
		SettingsRenameSectionComponent,
		SettingsLogoSectionComponent,
		SettingsPerformanceSectionComponent,
  SettingsDangerSectionComponent,
	],
	imports: [CommonModule, SharedModule, SettingsRoutingModule],
})
export class SettingsModule {}
