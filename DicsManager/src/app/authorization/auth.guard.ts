import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';

import { Observable } from 'rxjs';
import { Users } from '../interfaces/users';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.checkAccess(route, state);
    }

    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
        return this.checkAccess(route);
    }

    private checkAccess(route, state?) {
        const user: Users = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
          return true;
        }
        this.router.navigate(['/']);
        return false;
    }

}
