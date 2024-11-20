import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient);

  url = 'http://localhost:3000/';

  constructor() { }

  getAccounts() {
    return this.http.get<Profile[]>(`${this.url}accounts`);
  }
}
