import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { Pageable, PageByPage } from '../interfaces/pageble.i';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient);

  url = 'http://localhost:3000/';

  me = signal<Profile | null>(null);

  filteredProfiles = signal<Profile[]>([]);

  constructor() { }

  getAccounts() {
    return this.http.get<Profile[]>(`${this.url}accounts`);
  }

  getMe() {
    return this.http.get<Profile>(`${this.url}me`).pipe(
      tap(res => this.me.set(res))
    );
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.url}account/${id}`);
  }

  getSubscribersShotList(subscribers = 3) {
  // return this.http.get<PageByPage<Profile, number>>(`${this.url}`);
    return this.http.get<Pageable<Profile>>(`${this.url}subscribers`)
      .pipe(
        map((res) => res.items.slice(0, subscribers))
      );
  }

  patchProfile(profile: Partial<Profile>) {
    console.log('PATCH')
    return this.http.patch<Profile[]>(`${this.url}accounts/${profile.id}`, profile);
  }

  uploadAvatar(file: File) {
    const fd = new FormData();
    fd.append('image', file);
    return this.http.post<Profile>(`${this.url}accounts/upload_image`, fd)
  }

  filterProfiles(params: Record<string, any>) {
    console.log(':???:Params?F');
    // <Pagable<Profile>>
    return this.http.get<Profile[]>(
      `${this.url}accounts`,
      {
        params
      }
    ).pipe(
      tap((res) => this.filteredProfiles.set(res))
    );
  }
}
