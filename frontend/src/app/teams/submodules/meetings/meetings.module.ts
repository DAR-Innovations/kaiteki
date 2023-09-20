import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingsComponent } from './pages/meetings/meetings.component';
import { MeetingsRoutingModule } from './meetings-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MeetingsComponent],
  imports: [CommonModule, SharedModule, MeetingsRoutingModule],
})
export class MeetingsModule {}
