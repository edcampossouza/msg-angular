import { Component, OnInit } from '@angular/core';
import { Message } from '../../types/Message';
import { CommonModule } from '@angular/common';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { MessagesService } from '../../services/messages.service';
import { UiService } from '../../services/ui.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, MessageBoxComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent implements OnInit {
  constructor(
    private messageService: MessagesService,
    private ui: UiService,
    private userService: UserService
  ) {
    this.ui.onSelectChat().subscribe((name) => (this.activeChat = name));
  }
  activeChat?: string;
  ngOnInit(): void {
    this.messageService.fetchAllMessages().subscribe({
      next: (m) => (this.messages = m),
      error: () => alert('Problem fetching messages'),
    });
  }
  messages: Message[] = [];

  showMessage(message: Message): boolean {
    if (!this.activeChat) return false;
    const currUser = this.userService.getUser()?.username;
    if (currUser === this.activeChat)
      return (
        message.receiver.username === currUser &&
        message.sender.username === currUser
      );
    return [message.receiver.username, message.sender.username].includes(
      this.activeChat
    );
  }
}
