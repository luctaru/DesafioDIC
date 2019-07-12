import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authorization/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  container = false;

  user: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthService
    ) {
      this.authService.showMenu.subscribe(show => {
        this.container = show;
      });
      this.authService.currentUser.subscribe(data => {
        this.user = data;
      });
    }

  ngOnInit() {
    this.authService.showMenu.subscribe(show => {
      this.container = show;
    });

    this.authService.currentUser.subscribe(data => {
      this.user = data;
    });

    this.user = JSON.parse(localStorage.getItem('currentUser'));

  }

  logoff() {
    this.authService.logoff();
  }

  redirectToSettings() {
    this.router.navigate(['/settings']);
  }
}
