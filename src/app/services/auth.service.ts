import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Login } from '../data/interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  baseUrl = 'http://localhost:3000/';

  constructor() { }

  login(payload: Login) {
    return this.http.post(
      `${this.baseUrl}token`,
      payload
    )
  }

}
