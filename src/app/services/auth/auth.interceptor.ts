import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(':Intercept:Auth: ', req);
  const token = inject(AuthService).token;

  if (!token) return next(req);

  req = req.clone({
    setHeaders: {
      // "accessToken": `Bearer ${token}`,
      Authorization: `Bearer ${token}`,
    }
  });
  
  return next(req);
};
