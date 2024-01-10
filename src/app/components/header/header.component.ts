import { Component } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  activeChat?: string;
  user?: string;
  autoScroll: boolean = false;
  constructor(private uiService: UiService, private userService: UserService) {
    this.uiService.onSelectChat().subscribe((x) => (this.activeChat = x));
    this.uiService.onChangeAutoScroll().subscribe((x) => (this.autoScroll = x));
    this.userService.onUserName().subscribe((x) => {
      this.user = x;
    });
  }
  changeAutoScroll() {
    this.uiService.setAutoScroll(!this.autoScroll);
  }
}
