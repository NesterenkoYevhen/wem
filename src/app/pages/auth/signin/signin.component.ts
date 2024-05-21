import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { AuthService } from '../auth.service';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { Router } from '@angular/router';
import { UniqueUsername } from '../validators/unique-username';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
  });

  constructor(
    private authService: AuthService,
    private notificationService: NotificationsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.signinForm.invalid) {
      return;
    }

    const { email, password } = this.signinForm.value;

    this.authService
      .signin({
        email,
        password,
      })
      .subscribe({
        next: () => {
          this.notificationService.addSuccess('Success!');
          this.router.navigateByUrl('/email');
        },
        error: (err) => {
          if (err.email) {
            this.notificationService.addError('Incorrect email!');
            this.signinForm.reset();
          }

          if(err.password) {
            this.notificationService.addError('Incorrect password!');
            this.signinForm.reset();
          }
        },
      });
  }
}
