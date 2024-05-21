import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../email.service';
import { User } from 'src/app/types/user';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent implements OnInit {
  user: User;
  isSaveDraft = true;
  newLetterForm = new FormGroup({
    to: new FormControl('', [Validators.required, Validators.email]),
    cc: new FormControl('', [Validators.email]),
    subject: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    msg: new FormControl('', [Validators.minLength(1)]),
  });

  constructor(
    private emailService: EmailService,
    private notificationService: NotificationsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.emailService.getUserIdFromLocalStorage();
    this.emailService.getUserInfoByID(id).subscribe((res) => {
      this.user = res;
    });
  }

  ngOnDestroy() {
    const { to, cc, subject, msg } = this.newLetterForm.value;
    if (this.isSaveDraft && (to || cc || subject || msg)) {
      this.emailService
        .saveDraft({
          from: this.user.email,
          to,
          cc,
          subject,
          date: new Date(),
          msg,
        })
        .subscribe({
          next: () => {
            this.notificationService.addSuccess('Draft was successfully saved!');
          },
        });
    }
  }

  onSubmit() {
    if (this.newLetterForm.invalid) {
      return;
    }

    const { to, cc, subject, msg } = this.newLetterForm.value;

    this.emailService
      .sendNewLetter({
        from: this.user.email,
        to,
        cc,
        subject,
        date: new Date(),
        msg,
      })
      .subscribe({
        next: () => {
          this.isSaveDraft = false;
          this.notificationService.addSuccess('Letter was successfully sent!');
          this.router.navigateByUrl('/email');
        },
        error: (err) => {
          if (err?.error?.emailTo) {
            this.notificationService.addError(
              'There is no recipient user with this email in our service!'
            );
            this.newLetterForm.reset();
          }

          if (err?.error?.cc) {
            this.notificationService.addError(
              'There is no cc user with this email in our service!'
            );
            this.newLetterForm.reset();
          }
        },
      });
  }
}
