import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject, catchError, filter, switchMap, tap, throwError } from 'rxjs';

let isRefreshing$ = new BehaviorSubject(false);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(':Intercept:Auth: ', req);
  const authService = inject(AuthService);
  const token = authService.token;

  if (!token) return next(req); 

  if (isRefreshing$.value) {
    return refreshAndProceed(authService, req, next);
  }
  
  return next(addHeaderToken(req, token)).pipe(
    catchError((error) => {
      console.log(':::::Http:Error:', error.status);
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
    if (!isRefreshing$.value) {
      isRefreshing$.next(true);
      return authService.refreshAuthToken().pipe(
        switchMap((res) => {
          return next(addHeaderToken(req, res.accessToken)).pipe(
            tap(() => isRefreshing$.next(false))
          );
        })
      );
    }

    if (req.url.includes('refresh')) return next(addHeaderToken(req, authService.token!));

    // ?? added to queue
    return isRefreshing$.pipe(
      filter(isRefreshing => {return !isRefreshing; console.log('[auth:refresh]', isRefreshing)}),
      switchMap((res) => {
        return next(addHeaderToken(req, authService.token!));
      })
    )
  
    // return next(addHeaderToken(req, authService.token!)); // !!!

}

const addHeaderToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
      // "accessToken": `Bearer ${token}`,
      Authorization: `Bearer ${token}`,
    }
  });
}
