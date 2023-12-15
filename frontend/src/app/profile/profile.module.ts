import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDialogComponent } from './components/dialogs/profile-dialog/profile-dialog.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProfileDialogComponent],
  imports: [CommonModule, SharedModule],
})
export class ProfileModule {}
