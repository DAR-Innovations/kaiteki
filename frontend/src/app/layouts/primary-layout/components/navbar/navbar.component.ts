import { PageHeaderService } from 'src/app/shared/components/page-header/page-header.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  mobileSidebarOpen = false;

  constructor(private pageHeaderService: PageHeaderService) {}

  toggleMobileSidebar(state: boolean) {
    this.mobileSidebarOpen = state;
  }

  get header() {
    return this.pageHeaderService.header.asObservable();
  }
}
