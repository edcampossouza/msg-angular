import { Component } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  activeChat?: string;
  user?: string;
  autoScroll: boolean = false;
  constructor(
    private uiService: UiService,
    private userService: UserService,
    private router: Router
  ) {
    this.uiService.onSelectChat().subscribe((x) => (this.activeChat = x));
    this.uiService.onChangeAutoScroll().subscribe((x) => (this.autoScroll = x));
    this.userService.onUserName().subscribe((x) => {
      this.user = x;
    });
  }
  changeAutoScroll() {
    this.uiService.setAutoScroll(!this.autoScroll);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  showOptions() {
    return this.router.url === '/';
  }
}
