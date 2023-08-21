import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-teams-layout',
  templateUrl: './teams-layout.component.html',
  styleUrls: ['./teams-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsLayoutComponent {
  index = 0;  
}
