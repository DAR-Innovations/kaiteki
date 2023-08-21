import { PageHeaderService } from 'src/app/shared/components/page-header/page-header.service';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent {
  @Input() set value(v: string) {
    this.PageHeaderService.changeHeader(v);
  }

  constructor(private PageHeaderService: PageHeaderService) {}
}
