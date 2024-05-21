import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './pages/auth/auth.service';
import { Router } from '@angular/router';
import { NotificationsService } from './shared/notifications/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  signedin$: BehaviorSubject<boolean>;

  constructor(
    private authServiсe: AuthService,
    private router: Router,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit() {
    if (this.authServiсe.checkAuth()) {
      this.router.navigateByUrl(`/email`);
      this.notificationsService.addSuccess('Authenticated!');
    } else {
      this.notificationsService.addError('You are not authenticated!');
    }
  }
}
