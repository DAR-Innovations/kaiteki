import { Injectable } from '@angular/core';
import { Users } from '../models/user.type';
import { LoginDTO, SignupDTO } from '../models/auth.dto';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, EMPTY, catchError, map, switchMap, tap } from 'rxjs';
import { Tokens } from '../models/token.dto';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { Router } from '@angular/router';
import { TokensService } from './tokens.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL: string = 'api/v1/auth';
  private user = new BehaviorSubject<Users | null>(null);
  user$ = this.user.asObservable();

  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService,
    private tokensService: TokensService,
    private router: Router
  ) {}

  onLogin(dto: LoginDTO) {
    return this.httpClient.post<Tokens>(`${this.baseURL}/login`, dto).pipe(
      catchError((err) => {
        this.toastrService.open('Failed to login');
        return EMPTY;
      }),
      map((tokens) => {
        if (!tokens) {
          this.toastrService.open('Failed to login');
          return false;
        }

        this.tokensService.saveTokens(tokens);

        return true;
      }),
      switchMap(() => {
        return this.onAutoLogin();
      })
    );
  }

  onSignup(dto: SignupDTO) {
    return this.httpClient.post<Tokens>(`${this.baseURL}/register`, dto).pipe(
      catchError(() => {
        this.toastrService.open('Failed to signup');
        return EMPTY;
      }),
      map((tokens) => {
        if (!tokens) {
          this.toastrService.open('Failed to signup');
          return false;
        }

        this.tokensService.saveTokens(tokens);
        return true;
      }),
      tap((result) => {
        if (result) {
          this.router.navigate(['/app']);
        }
      })
    );
  }

  onAutoLogin() {
    return this.httpClient.get<Users>('/api/v1/users/current').pipe(
      map((user) => {
        if (user) {
          this.user.next(user);
          return true;
        }

        return false;
      })
    );
  }

  onLogout() {
    return this.httpClient.post<Tokens>(`${this.baseURL}/logout`, {}).pipe(
      catchError(() => {
        this.toastrService.open('Failed to logout');
        return EMPTY;
      }),
      tap(() => {
        localStorage.clear();
        this.router.navigate(['/']);
      })
    );
  }

  onRefreshToken(refreshToken: string) {
    return this.httpClient.post<Tokens>(`${this.baseURL}/refresh-token`, {
      refreshToken,
    });
  }
}
