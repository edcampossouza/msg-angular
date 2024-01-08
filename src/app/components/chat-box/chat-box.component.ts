import { Component, Input } from '@angular/core';
import { Chat } from '../../types/Chat';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css',
})
export class ChatBoxComponent {
  @Input({ required: true }) chat!: Chat;
  @Input() selected: boolean = false;
}
