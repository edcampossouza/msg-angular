import { Component } from '@angular/core';
import { Chat } from '../../types/Chat';
import { chats } from '../../mock/chats-mock';
import { CommonModule } from '@angular/common';
import { ChatBoxComponent } from '../chat-box/chat-box.component';
import { UiService } from '../../services/ui.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [CommonModule, ChatBoxComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css',
})
export class ChatsComponent {
  chats: Chat[] = [];
  selected?: string;

  constructor(private ui: UiService, private userService: UserService) {
    this.ui.onSelectChat().subscribe((name) => (this.selected = name));
    this.userService.onFetchUsers().subscribe((u) => {
      this.chats = u.map((user) => ({ name: user.username }));
    });
  }

  selectChat(name: string) {
    this.ui.toggleActiveChat(name);
  }
}
