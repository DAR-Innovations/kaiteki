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

  constructor(private pageHeaderService: PageHeaderService) {}

  get header() {
    return this.pageHeaderService.header.asObservable();
  }
}
