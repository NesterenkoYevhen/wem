import { Component, OnInit } from '@angular/core';
import { Email } from 'src/app/types/email';
import { EmailService } from '../email.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.css'],
})
export class DraftsComponent implements OnInit {
  drafts: Email[] = [];
  activeLetter: Email;

  constructor(private emailService: EmailService) {}

  ngOnInit(): void {
    this.emailService.getDrafts().subscribe((res) => {
      this.drafts = this.sortByDateDescending(res);
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
          return this.emailService.getDrafts();
        })
      )
      .subscribe((res) => {
        this.drafts = this.sortByDateDescending(res);
      });
  }

  onDeleteLetter(id: number) {
    this.activeLetter = null;
    this.emailService
      .deleteDraft(id)
      .pipe(
        switchMap(() => {
          return this.emailService.getDrafts();
        })
      )
      .subscribe((res) => {
        this.drafts = this.sortByDateDescending(res);
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
