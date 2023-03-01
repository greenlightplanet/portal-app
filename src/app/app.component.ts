import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username!: string;
  password!: string;
  isLoggedIn: boolean = true;

  constructor(private router: Router){}

  ngOnInit() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    // Check if user is already logged in
  }

}
