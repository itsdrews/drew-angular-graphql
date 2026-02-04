import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { filter, map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    filter((v): v is boolean => v !== null),
    take(1),
    map(isAuth =>
      isAuth ? true : router.createUrlTree(['/login'])
    )
  );
};
