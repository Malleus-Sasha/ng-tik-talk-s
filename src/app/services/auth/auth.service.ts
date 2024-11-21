import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Login } from '../../data/interfaces/login';
import { tap } from 'rxjs';
import { Token } from '../../data/interfaces/token';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
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
        this.token = res.accessToken;
        this.refreshToken = res.refreshToken;

        this.cookieService.set('token', this.token);
        this.cookieService.set('refreshToken', this.refreshToken);
      })
    )
  }

  register(payload: Login) {
    return this.http.post(
      `${this.baseUrl}register`,
      payload
    )
  }

}
