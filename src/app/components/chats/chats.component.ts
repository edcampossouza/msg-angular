import { Component } from '@angular/core';
import { Chat } from '../../types/Chat';
import { chats } from '../../mock/chats-mock';
import { CommonModule } from '@angular/common';
import { ChatBoxComponent } from '../chat-box/chat-box.component';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [CommonModule, ChatBoxComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css',
})
export class ChatsComponent {
  chats: Chat[] = chats;
  selected?: string;

  constructor(private ui: UiService) {
    this.ui.onSelectChat().subscribe((name) => (this.selected = name));
  }

  selectChat(name: string) {
    this.ui.toggleActiveChat(name);
  }
}
