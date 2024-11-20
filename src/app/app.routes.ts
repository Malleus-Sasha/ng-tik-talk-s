import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SearchComponent } from './pages/search/search.component';

export const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'login', component: LoginComponent },
];
