import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MessagesService } from '../../services/messages.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.css',
})
export class MessageInputComponent {
  sendTo?: string;

  constructor(private messageService: MessagesService, private ui: UiService) {
    this.ui.onSelectChat().subscribe((s) => (this.sendTo = s));
  }

  formGroup = new FormGroup({
    message: new FormControl('', { nonNullable: true }),
  });

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
