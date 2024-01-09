import { Component } from '@angular/core';
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
export class MessagesComponent {
  constructor(
    private messageService: MessagesService,
    private ui: UiService,
    private userService: UserService
  ) {
    this.ui.onSelectChat().subscribe((name) => (this.activeChat = name));
    this.messageService.onUpdateMessages().subscribe({
      next: (msgs) => (this.messages = msgs),
      error: (err) => {
        console.log(err);
        alert('Problem fetching messages');
      },
    });
  }
  activeChat?: string;

  messages: Message[] = [];

  showMessage(message: Message): boolean {
    if (!this.activeChat) return false;
    const currUser = this.userService.getUser()?.username;
    if (currUser === this.activeChat)
      return (
        message.recipient.username === currUser &&
        message.sender.username === currUser
      );
    return [message.recipient.username, message.sender.username].includes(
      this.activeChat
    );
  }
}
