import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { WorkoutListComponent } from './features/workout-list/workout-list';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { map } from 'rxjs';
export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'workouts',
    component: WorkoutListComponent,
    canActivate: [
      () =>
        inject(AuthService).isAuthenticated$.pipe(
          map((isAuth) => isAuth || inject(Router).createUrlTree(['/login'])),
        ),
    ],
  },
  { path: '', redirectTo: '/workouts', pathMatch: 'full' },
];
