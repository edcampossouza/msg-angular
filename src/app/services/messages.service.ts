import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../types/Message';
import { Observable, Subject, map, tap, repeat, delay } from 'rxjs';
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
  lastMsgId = -Infinity;
  private timeoutRef: ReturnType<typeof setTimeout> | null = null;

  constructor(private httpClient: HttpClient) {
    this.init();
  }

  init() {
    this.fetchAllMessages().subscribe({
      next: () => this.beginMessageRefresh(),
    });
  }

  beginMessageRefresh() {
    const obs = this.httpClient
      .get<Message[]>(
        `${environment.apiUrl}/messages?type=all&after=${this.lastMsgId}`,
        this.getOptions()
      )
      .subscribe({
        next: (msgs) => {
          this.updateMessages([...this.messages, ...msgs]);
          if (this.timeoutRef) {
            clearInterval(this.timeoutRef);
          }
          this.timeoutRef = setTimeout(
            () => this.beginMessageRefresh(),
            5 * 1000
          );
        },
        error: () => setTimeout(() => this.beginMessageRefresh(), 5 * 1000),
      });
  }

  updateMessages(lst: Message[]) {
    this.messages = lst;
    this.messagesSubject.next(lst);
    this.lastMsgId = this.messages.reduce(
      (prev, curr) => Math.max(prev, curr.messageId),
      this.lastMsgId
    );
  }

  fetchAllMessages(): Observable<Message[]> {
    const obs = this.httpClient.get<Message[]>(
      `${environment.apiUrl}/messages?type=all`,
      this.getOptions()
    );

    return obs.pipe(
      tap((msgs) => {
        this.lastMsgId = msgs.reduce(
          (prev, curr) => Math.max(prev, curr.messageId),
          this.lastMsgId
        );
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
        this.lastMsgId = Math.max(this.lastMsgId, msg.messageId);
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
