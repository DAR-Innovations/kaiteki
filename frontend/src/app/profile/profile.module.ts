import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from '../shared/shared.module'

import { ProfileDialogComponent } from './components/dialogs/profile-dialog/profile-dialog.component'

@NgModule({
	declarations: [ProfileDialogComponent],
	imports: [CommonModule, SharedModule],
})
export class ProfileModule {}
