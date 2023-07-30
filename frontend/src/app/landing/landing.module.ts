import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgIconsModule } from '@ng-icons/core';
import { matMenuRound, matCloseRound } from "@ng-icons/material-icons/round"

@NgModule({
  declarations: [LandingComponent, NavbarComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    NgIconsModule.withIcons({ matMenuRound, matCloseRound }),
  ],
  exports: [LandingComponent],
})
export class LandingModule {}
