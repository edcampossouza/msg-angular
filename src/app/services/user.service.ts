import { Injectable } from '@angular/core';
import { User } from '../types/User';
import { user } from '../mock/user-mock';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getUser(): User {
    return user;
  }
}
