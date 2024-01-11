import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './services/user.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  if (inject(UserService).isLoggedIn()) {
    return true;
  }
  inject(Router).navigate(['login']);
  return false;
};
