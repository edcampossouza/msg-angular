import { Component } from '@angular/core';
import { ChatsComponent } from '../chats/chats.component';
import { MessagesComponent } from '../messages/messages.component';
import { MessageInputComponent } from '../message-input/message-input.component';

@Component({
  selector: 'app-main-area',
  standalone: true,
  imports: [ChatsComponent, MessagesComponent, MessageInputComponent],
  templateUrl: './main-area.component.html',
  styleUrl: './main-area.component.css',
})
export class MainAreaComponent {}
