import { Component, OnInit } from '@angular/core';
import { Message } from '../../types/Message';
import { CommonModule } from '@angular/common';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, MessageBoxComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent implements OnInit {
  constructor(private messageService: MessagesService) {}
  ngOnInit(): void {
    this.messageService.fetchAllMessages().subscribe({
      next: (m) => (this.messages = m),
      error: () => alert('Problem fetching messages'),
    });
  }
  messages: Message[] = [];
}
