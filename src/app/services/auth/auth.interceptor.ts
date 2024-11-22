import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(':Intercept:Auth: ', req);
  const authService = inject(AuthService);
  const token = authService.token;

  if (!token) return next(req);
  
  return next(addHeaderToken(req, token)).pipe(
    catchError((error) => {
      console.log(':Http:Error:', error);
      if (error.status === 403) {
        return refreshAndProceed(authService, req, next);
      }
      return throwError(error);
    })
  ); 
};

const refreshAndProceed = (
  authService: AuthService, 
  req: HttpRequest<any>, 
  next: HttpHandlerFn ) => {
  return authService.refreshAuthToken().pipe(
    switchMap((res) => {
      return next(addHeaderToken(req, res.accessToken));
    })
  );
}

const addHeaderToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
      // "accessToken": `Bearer ${token}`,
      Authorization: `Bearer ${token}`,
    }
  });
}
