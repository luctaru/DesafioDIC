import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Users } from 'src/app/interfaces/users';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/authorization/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('userEmail', {static: false}) userEmail: ElementRef;
  @ViewChild('userPassword', {static: false}) userPassword: ElementRef;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const user: Users = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      this.router.navigate(['/kanban']);
    }

  }

  login() {
    const email = this.userEmail.nativeElement;
    const password = this.userPassword.nativeElement;
    if (!email.value) {
      email.focus();
      return;
    }
    if (!password.value) {
      password.focus();
      return;
    }
    this.authService.login(email.value, password.value)
      .then(res => {
        const user = res as Users;
        if (!user) {
          this.invalidLogin();
        } else {
          this.router.navigate(['/kanban']);
        }
      }).catch((err) => {
        if (err.status === 401) {
          this.invalidLogin();
          password.value = '';
          password.focus();
        }
      });
  }

  invalidLogin() {
    this.snackBar.open('User/password inválido!', 'OK', { duration: 3000 }).afterDismissed().subscribe(() =>
    this.userPassword.nativeElement.focus());
  }

}
