import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-tables',
  templateUrl: './login-tables.component.html',
  styleUrls: ['./login-tables.component.css']
})
export class LoginTablesComponent implements OnInit {
  username!: string;
  password!: string;

  constructor(private router: Router) { }

  ngOnInit() {  // Set username and password in local storage
    localStorage.setItem('username', 'sathyam');
    localStorage.setItem('password', 'goyal');
    localStorage.setItem('isLoggedIn', 'false');
  }

  login() {
    // Get saved credentials from local storage
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');

    // Check if credentials match
    if (this.username === savedUsername && this.password === savedPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      // Route to tables component
      this.router.navigate(['tables']);
    } else {
      // Show alert message
      alert('Invalid username or password');
    }
  }
}
