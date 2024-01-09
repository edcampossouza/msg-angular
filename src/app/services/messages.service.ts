import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { Message } from '../types/Message';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { SendMessageDTO } from '../types/SendMessageDTO';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messages: Message[] = [];
  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  fetchAllMessages(): Observable<Message[]> {
    return this.httpClient.get<Message[]>(
      `${environment.apiUrl}/messages?type=all`,
      this.getOptions()
    );
  }

  sendMessage(recipient: string, text: string): Observable<Message> {
    const payload: SendMessageDTO = {
      recipient,
      text,
    };
    const obs = this.httpClient.post<Message>(
      `${environment.apiUrl}/messages`,
      payload,
      this.getOptions()
    );
    obs.pipe(tap((msg) => this.messages.push(msg)));
    return obs;
  }

  getOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
  }
}
