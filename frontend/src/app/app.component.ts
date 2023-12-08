import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();

  constructor(private authService: AuthService) {
    this.authService
      .onAutoLogin()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
