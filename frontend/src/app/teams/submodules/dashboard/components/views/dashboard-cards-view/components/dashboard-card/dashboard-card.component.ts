import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCardComponent {
  @Input() member: any = null;

  getPerformanceColor(performance: number) {
    if (performance <= 100 && performance >= 70) {
      return ['#6d9f33', '#F0F5EA'];
    } else if (performance < 70 && performance >= 40) {
      return ['#f4a40f', '#FDF5E7'];
    } else {
      return ['#ef6a6b', '#FDF0F0'];
    }
  }
}
