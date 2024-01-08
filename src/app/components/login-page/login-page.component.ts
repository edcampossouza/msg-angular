import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private userService: UserService
  ) {}
  loginForm = new FormGroup({
    username: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
    confirmPassword: new FormControl(''),
  });

  onSubmit() {
    if (this.router.url === '/login') {
      this.login();
    } else if (this.router.url === '/signup') {
      this.signUp();
    }
  }

  signUp() {
    const { username, password, confirmPassword } = this.loginForm.value;
    if (confirmPassword !== password) return alert("Passwords don't match");
    this.userService.signup(username || '', password || '').subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        alert('Something went wrong');
      },
    });
  }

  login() {
    const { username, password } = this.loginForm.value;
    this.userService.login(username || '', password || '').subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        alert('Authentication error');
      },
    });
  }
}
