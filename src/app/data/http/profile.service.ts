import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { Pageable, PageByPage } from '../interfaces/pageble.i';
import { map } from 'rxjs';

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

  getMe() {
    return this.http.get<Profile>(`${this.url}accounts/me`);
  }

  getSubscribersShotList() {
  // return this.http.get<PageByPage<Profile, number>>(`${this.url}`);
    return this.http.get<Pageable<Profile>>(`${this.url}subscribers`)
      .pipe(
        map((res) => res.items.slice(0, 3))
      );
  }
}
