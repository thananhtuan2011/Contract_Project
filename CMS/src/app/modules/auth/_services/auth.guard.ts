import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private cookieService: CookieService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.getAccessToken_cookie();
    if (currentUser) {
      if (!this.authService.isAuthenticated()) {
        this.authService.logout();
        return false

      }
      else {
        return true;

      }
      // logged in so return true
    }

    // not logged in so redirect to login page with the return url
    this.authService.logout();
    return false;
  }
}
