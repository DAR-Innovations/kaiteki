import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-landing-layout',
  templateUrl: './landing-layout.component.html',
  styleUrls: ['./landing-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingLayoutComponent {}
