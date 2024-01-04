import { Component, Input } from '@angular/core';
import { Message } from '../../types/Message';
import { UserService } from '../../services/user.service';
import { User } from '../../types/User';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-box.component.html',
  styleUrl: './message-box.component.css',
})
export class MessageBoxComponent {
  user: User;
  constructor(private userService: UserService) {
    this.user = this.userService.getUser();
  }
  @Input({ required: true }) message!: Message;
}
