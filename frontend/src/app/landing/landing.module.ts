import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [LandingComponent, NavbarComponent],
  imports: [CommonModule],
  exports: [LandingComponent],
})
export class LandingModule {}
