import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isHeaderMenuOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  toggleHeaderMenu() {
    this.isHeaderMenuOpen = !this.isHeaderMenuOpen;
  }

  onSignout() {
    this.authService.signout();
    this.router.navigateByUrl('/');
  }
}
