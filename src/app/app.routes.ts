import { Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout/layout.component';
import { ProfilePageComponent } from 'pages/profile-page/profile-page.component';
import { SearchComponent } from 'pages/search/search.component';
import { LoginComponent } from 'pages/login/login.component';

export const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    { path: '', component: SearchComponent },
    { path: 'profile', component: ProfilePageComponent },

  ] },
  { path: 'login', component: LoginComponent },
];
