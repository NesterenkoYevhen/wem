import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatchPassword } from '../validators/match-password';
import { AuthService } from '../auth.service';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { UniqueUsername } from '../validators/unique-username';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup(
    {
      fullname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z]+$/),
      ]),
      email: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
        ],
        [this.uniqueUsername.validate]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{8,}$/),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    { validators: [this.matchPassword.validate] }
  );
  gender = 'FEMALE';

  constructor(
    private matchPassword: MatchPassword,
    private authService: AuthService,
    private notificationService: NotificationsService,
    private router: Router,
    private uniqueUsername: UniqueUsername
  ) {}

  ngOnInit(): void {}

  setGender(value: string) {
    this.gender = value;
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    const { fullname, email, password } = this.signupForm.value;

    this.authService
      .signup({
        fullname,
        email: `${email}@wem.com`,
        password,
        username: email,
        gender: this.gender
      })
      .subscribe({
        next: () => {
          this.notificationService.addSuccess('Success!');
          this.router.navigateByUrl('/email');
        },
        error: (err) => {
          if (!err.status) {
            this.signupForm.setErrors({ noConnection: true });
          } else {
            this.notificationService.addError('Some error was occured');
            this.signupForm.setErrors({ unknownError: true });
          }
        },
      });
  }
}
