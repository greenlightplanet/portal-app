import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      return true;
    }

    // User is not authenticated, redirect to login page
    return this.router.createUrlTree(['/login']);
  }
}