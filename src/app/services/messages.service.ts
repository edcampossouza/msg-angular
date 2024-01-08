import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { Message } from '../types/Message';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messages: Message[] = [];
  constructor(
    private httpClient: HttpClient,
  ) {}

  fetchAllMessages(): Observable<Message[]> {
    return this.httpClient.get<Message[]>(
      `${environment.apiUrl}/messages?type=all`,
      this.getOptions()
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
