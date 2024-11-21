import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const isAuth = inject(AuthService).isAuth;

  if (isAuth) return true;

  return inject(Router).createUrlTree(['/login']);
}; 
