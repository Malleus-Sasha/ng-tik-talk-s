import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Login } from '../../data/interfaces/login';
import { catchError, tap, throwError } from 'rxjs';
import { Token } from '../../data/interfaces/token';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);
  cookieService = inject(CookieService);
  baseUrl = 'http://localhost:3000/';

  token: string | null = null;
  refreshToken: string | null = null;

  constructor() { }

  get isAuth(): boolean {
    if (!this.token) {
      this.token = this.cookieService.get('token');
    }
    return !!this.token;
  }

  login(payload: Login) {
    return this.http.post<Token>(
      `${this.baseUrl}login`,
      payload
    ).pipe(
      tap((res) => {
        this.saveTokens(res);
      })
    )
  }

  register(payload: Login) {
    return this.http.post(
      `${this.baseUrl}register`,
      payload
    )
  }

  refreshAuthToken() {
    return this.http.post<Token>(
      `${this.baseUrl}login`,
      { refresh_token: this.refreshToken }
    ).pipe(
      tap(res => this.saveTokens(res)),
      catchError(err => {
        this.logout();
        return throwError(err);
      })
    )
  }

  logout() {
    this.cookieService.deleteAll();
    this.token = null;
    this.refreshToken = null;
    this.router.navigateByUrl('/login');
  }

  saveTokens(res: Token) {
    this.token = res.accessToken;
    this.refreshToken = res.refreshToken;

    this.cookieService.set('token', this.token);
    this.cookieService.set('refreshToken', this.refreshToken);
  }

}
