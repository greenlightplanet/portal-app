import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  constructor() { }

  login(username: string, password: string): boolean {
    // Check if credentials match
    if (username === 'glpadmin' && password === 'glp@123') {
      // Set isLoggedIn to true
      this.isLoggedIn = true;
      // Set username and password in local storage
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    // Set isLoggedIn to false
    this.isLoggedIn = false;
    // Remove saved credentials from local storage
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('isLoggedIn');
  }

  isAuthenticated(): boolean {
    // Get saved credentials from local storage
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');

    // Check if isLoggedIn is true and saved credentials exist
    if (this.isLoggedIn && savedUsername && savedPassword) {
      // Check if credentials match
      if (savedUsername === 'glpadmin' && savedPassword === 'glp@123') {
        return true;
      }
    }
    return false;
  }
}
