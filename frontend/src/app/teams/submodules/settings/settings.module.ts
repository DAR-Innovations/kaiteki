import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from 'src/app/shared/shared.module'

import { PerformanceMetricsComponent } from './components/performance-metrics/performance-metrics.component'
import { SettingsComponent } from './pages/settings/settings.component'
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsRenameSectionComponent } from './components/settings-rename-section/settings-rename-section.component';
import { SettingsLogoSectionComponent } from './components/settings-logo-section/settings-logo-section.component'

@NgModule({
	declarations: [SettingsComponent, PerformanceMetricsComponent, SettingsRenameSectionComponent, SettingsLogoSectionComponent],
	imports: [CommonModule, SharedModule, SettingsRoutingModule],
})
export class SettingsModule {}
