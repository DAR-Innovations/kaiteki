import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryLayoutComponent } from './primary-layout.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SubMenuComponent } from './components/sub-menu/sub-menu.component';
import { MobileSidebarComponent } from './components/mobile-sidebar/mobile-sidebar.component';
import { TeamsModule } from 'src/app/teams/teams.module';
import { SpotifyModule } from 'src/app/integrations/submodules/spotify/spotify.module';

@NgModule({
  declarations: [
    PrimaryLayoutComponent,
    SidebarComponent,
    NavbarComponent,
    SubMenuComponent,
    MobileSidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    TeamsModule,
    SpotifyModule,
  ],
  exports: [PrimaryLayoutComponent],
})
export class PrimaryLayoutModule {}
