import { Routes } from '@angular/router';
import { MainAreaComponent } from './components/main-area/main-area.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: MainAreaComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: LoginPageComponent },
];
