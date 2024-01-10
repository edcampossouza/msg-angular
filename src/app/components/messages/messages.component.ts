import {
  Component,
  QueryList,
  ViewChildren,
  AfterViewChecked,
} from '@angular/core';
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
export class MessagesComponent implements AfterViewChecked {
  autoScroll: boolean = false;
  lastMsgScrolled = -1;
  constructor(
    private messageService: MessagesService,
    private ui: UiService,
    private userService: UserService
  ) {
    this.ui.onSelectChat().subscribe((name) => (this.activeChat = name));
    this.ui.onChangeAutoScroll().subscribe((x) => (this.autoScroll = x));
    this.messageService.onUpdateMessages().subscribe({
      next: (msgs) => {
        this.messages = msgs;
      },
      error: (err) => {
        alert('Problem fetching messages');
      },
    });
  }

  ngAfterViewChecked(): void {
    if (this.autoScroll) {
      const msgId = this.view.last?.message.messageId;
      if (msgId === this.lastMsgScrolled) return;
      this.lastMsgScrolled = msgId;
      const element = document.getElementById(msgId + '');
      element?.scrollIntoView();
    }
  }

  activeChat?: string;

  messages: Message[] = [];

  @ViewChildren(MessageBoxComponent) view: QueryList<MessageBoxComponent> =
    new QueryList();

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
