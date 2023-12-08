import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SignupDTO } from '../../models/auth.dto';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();

  strongPasswordRegx: RegExp =
    /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

  passwordMatchers = [
    { label: 'At least uppercase letter', pattern: '^(?=.*[A-Z])' },
    { label: 'At least one lowercase letter', pattern: '(?=.*[a-z])' },
    { label: 'At least one digit', pattern: '(.*[0-9].*)' },
    { label: 'At least one special character', pattern: '(?=.*[!@#$%^&*])' },
    { label: 'At least 8 characters long', pattern: '.{8,}' },
  ];

  form = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.min(2)]),
    lastname: new FormControl('', [Validators.required, Validators.min(2)]),
    birthDate: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(this.strongPasswordRegx),
    ]),
  });

  constructor(private authService: AuthService) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    const form = this.form.getRawValue();
    const allValuesNotNull = Object.entries(form).every(
      ([_, value]) => value !== null
    );

    if (!allValuesNotNull) return;

    const dto: SignupDTO = {
      firstname: form.firstname!,
      lastname: form.lastname!,
      birthDate: new Date(form.birthDate!),
      email: form.email!,
      password: form.email!,
    };

    this.authService
      .onSignup(dto)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }

  get passwordFormField() {
    return this.form.get('password');
  }
}
