import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';

import {
  LOGIN_MUTATION,
  REGISTER_MUTATION,
} from '../../features/auth/auth.graphql';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apollo = inject(Apollo);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  
  private authState = new BehaviorSubject<boolean | null>(null);
  readonly isAuthenticated$ = this.authState.asObservable();

  constructor() {
    if (this.isBrowser) {
      this.authState.next(!!localStorage.getItem('auth_token'));
    }
  }


  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  } 
  private setToken(token: string) {
    if (this.isBrowser) {
      localStorage.setItem('auth_token', token);
    }
  }

  private clearToken() {
    if (this.isBrowser) {
      localStorage.removeItem('auth_token');
    }
  }

  login(credentials: any) {
    return this.apollo
      .mutate<any>({
        mutation: LOGIN_MUTATION,
        variables: credentials,
      })
      .pipe(
        tap(({ data }) => {
          const token = data?.login?.token;
          if (!token) return;

          this.setToken(token);
          this.authState.next(true);
          this.router.navigate(['/workouts']);
        }),
      );
  }

  register(userData: any) {
    return this.apollo
      .mutate<any>({
        mutation: REGISTER_MUTATION,
        variables: userData,
      })
      .pipe(
        tap(({ data }) => {
          const token = data?.register?.token;
          if (!token) return;

          this.setToken(token);
          this.authState.next(true);
          this.router.navigate(['/workouts']);
        }),
      );
  }

  logout() {
    this.clearToken();
    this.authState.next(false);
    this.router.navigate(['/login']);
  }
}

