import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login-tables',
  templateUrl: './login-tables.component.html',
  styleUrls: ['./login-tables.component.css']
})
export class LoginTablesComponent implements OnInit {
  username!: string;
  password!: string;
  errorMessage!: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { 
    this.authService.logout(); // Log out user on component initialization
  }

  login() {
    const isAuthenticated = this.authService.login(this.username, this.password);
    if (isAuthenticated) {
      this.router.navigate(['tables']); // Route to tables component if authentication is successful
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
