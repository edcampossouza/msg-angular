import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../types/Message';
import { Observable, Subject, map, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  SendMessageDTO,
  SendMessageResponseDTO,
} from '../types/SendMessageDTO';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messages: Message[] = [];
  messagesSubject = new Subject<Message[]>();

  constructor(private httpClient: HttpClient) {
    this.fetchAllMessages().subscribe(() => {});
  }

  fetchAllMessages(): Observable<Message[]> {
    const obs = this.httpClient.get<Message[]>(
      `${environment.apiUrl}/messages?type=all`,
      this.getOptions()
    );

    return obs.pipe(
      tap((msgs) => {
        this.messages = msgs;
        this.messagesSubject.next(msgs);
      })
    );
  }

  onUpdateMessages(): Observable<Message[]> {
    return this.messagesSubject.asObservable();
  }

  sendMessage(recipient: string, text: string): Observable<Message> {
    const payload: SendMessageDTO = {
      recipient,
      text,
    };

    const obs = this.httpClient.post<SendMessageResponseDTO>(
      `${environment.apiUrl}/messages`,
      payload,
      this.getOptions()
    );

    return obs.pipe(
      tap(({ message: msg }) => {
        const msgs = [...this.messages, msg];
        this.messagesSubject.next(msgs);
        this.messages = msgs;
      }),
      map((x) => x.message)
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
