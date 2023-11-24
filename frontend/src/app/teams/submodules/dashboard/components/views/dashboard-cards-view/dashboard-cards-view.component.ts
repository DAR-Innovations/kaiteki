import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-cards-view',
  templateUrl: './dashboard-cards-view.component.html',
  styleUrls: ['./dashboard-cards-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCardsViewComponent {
  @Input() members: any[] = [];
}
