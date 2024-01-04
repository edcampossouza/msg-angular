import { Component } from '@angular/core';
import { Message } from '../../types/Message';
import { messages } from '../../mock/messages-mock';
import { CommonModule } from '@angular/common';
import { MessageBoxComponent } from '../message-box/message-box.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, MessageBoxComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent {
  messages: Message[] = messages;
}
