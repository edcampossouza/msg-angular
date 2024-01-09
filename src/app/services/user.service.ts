import { Injectable } from '@angular/core';
import { User } from '../types/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponseDTO } from '../types/LoginResponse.dto';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User | undefined;
  users: User[] = [];
  usersSubject = new Subject<User[]>();

  constructor(private httpClient: HttpClient) {
    this.init();
  }

  private init(): void {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.user = JSON.parse(userStr);
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
