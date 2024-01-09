import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MessagesService } from '../../services/messages.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.css',
})
export class MessageInputComponent {
  formGroup = new FormGroup({
    message: new FormControl('', { nonNullable: true }),
  });

  constructor(private messageService: MessagesService, private ui: UiService) {}

  sendMessage() {
    const userName = this.ui.getSelectedChat();
    const message = this.formGroup.value.message;
    if (!userName || !message) return;
    this.messageService.sendMessage(userName, message).subscribe({
      error: () => {
        alert('Problem');
      },
    });
    this.formGroup.setValue({ message: '' });
  }
}
