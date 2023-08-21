import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsLayoutComponent } from './teams-layout.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [TeamsLayoutComponent, NavbarComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [TeamsLayoutComponent],
})
export class TeamsLayoutModule {}
