import { Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout/layout.component';
import { ProfilePageComponent } from 'pages/profile-page/profile-page.component';
import { SearchComponent } from 'pages/search/search.component';
import { LoginComponent } from 'pages/login/login.component';
import { authGuard } from './services/auth/auth.guard';
import { SettingsPageComponent } from 'pages/settings-page/settings-page.component';

export const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
    { path: 'profile/:id', component: ProfilePageComponent },
    { path: 'settings', component: SettingsPageComponent },
    { path: 'search', component: SearchComponent },
  ],
    canActivate: [authGuard]
  },
  { path: 'login', component: LoginComponent },
];
