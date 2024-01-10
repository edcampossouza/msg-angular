import { Component, Input } from '@angular/core';
import { Message } from '../../types/Message';
import { UserService } from '../../services/user.service';
import { User } from '../../types/User';
import { CommonModule } from '@angular/common';

const timeOptions: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
};

const dateTimeOptions: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

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
    // make sure this component is only rendered when the user is logged in
    this.user = this.userService.getUser()!;
  }
  @Input({ required: true }) message!: Message;

  formatTime(time: string): string {
    const todayDate = new Date();
    const dt = new Date(time);
    if (todayDate.toLocaleDateString() === dt.toLocaleDateString())
      return dt.toLocaleString(undefined, timeOptions);
    return dt.toLocaleString(undefined, dateTimeOptions);
  }
}
