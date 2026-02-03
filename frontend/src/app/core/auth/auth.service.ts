import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { LOGIN_MUTATION } from '../../features/auth/auth.graphql';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apollo = inject(Apollo);
  private router = inject(Router);

  // BehaviorSubject mantém o estado de login atual para todo o app
  private authState = new BehaviorSubject<boolean>(!!localStorage.getItem('auth_token'));
  isAuthenticated$ = this.authState.asObservable();

  login(credentials: any) {
    return this.apollo
      .mutate<any>({
        mutation: LOGIN_MUTATION,
        variables: credentials,
      })
      .pipe(
        tap((result) => {
          const token = result.data.login.token;
          localStorage.setItem('auth_token', token);
          this.authState.next(true);
          this.router.navigate(['/workouts']);
        }),
      );
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.authState.next(false);
    this.router.navigate(['/login']);
  }
}
