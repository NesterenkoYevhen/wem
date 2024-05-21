import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';
import { Email } from 'src/app/types/email';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
})
export class InboxComponent implements OnInit {
  receivedEmails: Email[] = [];
  activeLetter: Email;
  unreadEmails: number;
  sortByDate = true;
  sortByUnread = false;

  constructor(private emailService: EmailService) {}

  ngOnInit(): void {
    this.emailService.getReceivedLetters().subscribe((res) => {
      this.receivedEmails = this.sortByDateDescending(res);
      this.unreadEmails = this.findUnread(this.receivedEmails);
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
          return this.emailService.getReceivedLetters();
        })
      )
      .subscribe((res) => {
        this.onSortLetters(res);
        this.unreadEmails = this.findUnread(this.receivedEmails);
      });
  }

  onDeleteLetter(id: number) {
    this.activeLetter = null;
    this.emailService
      .deleteLetter(id)
      .pipe(
        switchMap(() => {
          return this.emailService.getReceivedLetters();
        })
      )
      .subscribe((res) => {
        this.onSortLetters(res);
        this.unreadEmails = this.findUnread(this.receivedEmails);
      });
  }

  sortByDateDescending(emails: Email[]): Email[] {
    return emails.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  sortByReadStatus(emails: Email[]): Email[] {
    const readEmails = emails.filter((email) => email.isRead);
    const unreadEmails = emails.filter((email) => !email.isRead);

    readEmails.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    unreadEmails.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return unreadEmails.concat(readEmails);
  }

  onSortLettersByDate() {
    this.sortByUnread = false;
    this.sortByDate = true;
    this.receivedEmails = this.sortByDateDescending(this.receivedEmails);
  }

  onSortLettersByUnread() {
    this.sortByUnread = true;
    this.sortByDate = false;
    this.receivedEmails = this.sortByReadStatus(this.receivedEmails);
  }

  onSortLetters(emails: Email[]) {
    if (this.sortByDate) {
      this.receivedEmails = this.sortByDateDescending(emails);
    } else {
      this.receivedEmails = this.sortByReadStatus(emails);
    }
  }

  onCloseActiveLetter() {
    this.activeLetter = null;
  }
}
