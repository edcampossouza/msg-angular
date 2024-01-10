import { Injectable } from '@angular/core';
import { User } from '../types/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponseDTO } from '../types/LoginResponse.dto';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User | undefined;
  users: User[] = [];
  userSubject = new BehaviorSubject<string>('');
  usersSubject = new BehaviorSubject<User[]>([]);

  constructor(private httpClient: HttpClient, private router: Router) {
    this.init();
    router.events.subscribe(() => {
      this.init();
    });
  }

  private init(): void {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userParsed = JSON.parse(userStr);
      this.setUser(userParsed);
    }
    this.fetchUsers();
  }

  private fetchUsers() {
    this.httpClient
      .get<User[]>(`${environment.apiUrl}/user/all`, this.getOptions())
      .subscribe((u) => {
        this.users = u;
        this.usersSubject.next(u);
      });
  }

  getUser(): User | undefined {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
    this.userSubject.next(user.username);
  }

  onUserName(): Observable<string> {
    return this.userSubject.asObservable();
  }

  onFetchUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
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

  signup(username: string, password: string): Observable<LoginResponseDTO> {
    const obs = this.httpClient.post<LoginResponseDTO>(
      `${environment.apiUrl}/auth/signup`,
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

  getOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
  }
}
