import { Component, OnInit } from '@angular/core';
import { Email } from 'src/app/types/email';
import { EmailService } from '../email.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css'],
})
export class SentComponent implements OnInit {
  sentEmails: Email[] = [];
  activeLetter: Email;

  constructor(private emailService: EmailService) {}

  ngOnInit(): void {
    this.emailService.getSentLetters().subscribe((res) => {
      this.sentEmails = this.sortByDateDescending(res);
    });
  }

  findUnread(emails: Email[]) {
    return emails.filter((email) => !email.isRead).length;
  }

  onSetActiveLetter(email: Email) {
    this.activeLetter = email;
    this.emailService
      .setReadLetter(email.id)
      .pipe(
        switchMap(() => {
          return this.emailService.getSentLetters();
        })
      )
      .subscribe((res) => {
        this.sentEmails = this.sortByDateDescending(res);
      });
  }

  onDeleteLetter(id: number) {
    this.activeLetter = null;
    this.emailService
      .deleteLetter(id)
      .pipe(
        switchMap(() => {
          return this.emailService.getSentLetters();
        })
      )
      .subscribe((res) => {
        this.sentEmails = this.sortByDateDescending(res);
      });
  }

  sortByDateDescending(emails: Email[]): Email[] {
    return emails.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  onCloseActiveLetter() {
    this.activeLetter = null;
  }
}
