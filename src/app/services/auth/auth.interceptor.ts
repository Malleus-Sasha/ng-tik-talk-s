import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

let isRefreshing = false;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(':Intercept:Auth: ', req);
  const authService = inject(AuthService);
  const token = authService.token;

  if (!token) return next(req);

  if (isRefreshing) {
    return refreshAndProceed(authService, req, next);
  }
  
  return next(addHeaderToken(req, token)).pipe(
    catchError((error) => {
      console.log(':Http:Error:', error.status);
      // Unauthorized status 401
      if (error.status === 401) {
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
    if (!isRefreshing) {
      isRefreshing = true;
      return authService.refreshAuthToken().pipe(
        switchMap((res) => {
          isRefreshing = false;
          return next(addHeaderToken(req, res.accessToken));
        })
      );
    }
  
    return next(addHeaderToken(req, authService.token!));
}

const addHeaderToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
      // "accessToken": `Bearer ${token}`,
      Authorization: `Bearer ${token}`,
    }
  });
}
