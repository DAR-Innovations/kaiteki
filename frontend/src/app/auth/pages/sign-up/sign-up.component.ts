import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
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
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])(.{8,})$/;

  usernameRegx: RegExp = /^[a-zA-Z0-9]([a-zA-Z0-9]|-(?!-)){0,38}$/;

  passwordMatchers = [
    { label: 'At least uppercase letter', pattern: '^(?=.*[A-Z])' },
    { label: 'At least one lowercase letter', pattern: '(?=.*[a-z])' },
    { label: 'At least one digit', pattern: '(.*[0-9].*)' },
    { label: 'At least one special character', pattern: '(?=.*[!@#$%^&*])' },
    { label: 'At least 8 characters long', pattern: '.{8,}' },
  ];

  usernameMatchers = [
    { label: 'Starts with a letter or number', pattern: '^[a-zA-Z0-9]' },
    {
      label: 'Contains only letters, numbers, or hyphens',
      pattern: '[a-zA-Z0-9-]*',
    },
    { label: 'Does not have consecutive hyphens', pattern: '(?!--)' },
    { label: 'Does not start or end with a hyphen', pattern: '^[^-].*[^-]$' },
    { label: 'Between 1 and 38 characters long', pattern: '.{1,38}' },
  ];

  form = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.min(2)]),
    lastname: new FormControl('', [Validators.required, Validators.min(2)]),
    birthDate: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [
      Validators.required,
      Validators.pattern(this.usernameRegx),
    ]),
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
      username: form.username!.trim(),
      firstname: form.firstname!.trim(),
      lastname: form.lastname!.trim(),
      birthDate: new Date(form.birthDate!),
      email: form.email!.trim(),
      password: form.password!.trim(),
    };

    this.authService.signup(dto).pipe(takeUntil(this.unsubscribe$)).subscribe();
  }

  get passwordFormField() {
    return this.form.get('password');
  }

  get usernameFormField() {
    return this.form.get('username');
  }
}
