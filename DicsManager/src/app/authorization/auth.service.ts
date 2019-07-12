import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Users } from '../interfaces/users';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = `${environment.API}`;

  currentUser = new EventEmitter<Users>();
  showMenu = new EventEmitter<boolean>();

  public emitt = new EventEmitter();

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.API}/users/authenticate`, {
      email,
      password
    })
      .toPromise()
      .then(data => {
        let user = data.user as Users;
        if (user) {
          user.name = user.name.split(' ')[0];
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', data.token);
          this.currentUser.emit(user);
          this.showMenu.emit(true);
        } else {
          user = null;
          this.currentUser.emit(user);
          this.showMenu.emit(false);
        }
        console.log(user);
        return user;
      }).catch((error: any) => {
        Promise.reject(error);
      });
  }

  logoff() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    const user: Users = null;
    this.currentUser.emit(user);
    this.showMenu.emit(false);
    this.router.navigate(['/']);
  }
}
