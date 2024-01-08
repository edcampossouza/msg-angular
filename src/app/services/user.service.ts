import { Injectable } from '@angular/core';
import { User } from '../types/User';
import { HttpClient } from '@angular/common/http';
import { LoginResponseDTO } from '../types/LoginResponse.dto';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User | undefined;

  constructor(private httpClient: HttpClient) {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.user = JSON.parse(userStr);
    }
  }

  getUser(): User | undefined {
    return this.user;
  }

  login(username: string, password: string): Observable<LoginResponseDTO> {
    const obs = this.httpClient.post<LoginResponseDTO>(
      `${environment.apiUrl}/auth/login`,
      {
        username,
        password,
      }
    );
    return obs.pipe(
      tap((u) => {
        localStorage.setItem('token', u.token);
        localStorage.setItem('user', JSON.stringify(u.user));
        this.user = u.user;
      })
    );
  }

  signup(username: string, password: string) {
    this.httpClient
      .post<LoginResponseDTO>(`${environment.apiUrl}/auth/signup`, {
        username,
        password,
      })
      .subscribe((r) => {
        console.log(r);
      });
  }
}
