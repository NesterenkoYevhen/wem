import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  filter,
  flatMap,
  forkJoin,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { Email } from 'src/app/types/email';
import { User } from 'src/app/types/user';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  rootUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUserInfoByID(id: number) {
    return this.http.get<User>(`${this.rootUrl}/users/${id}`);
  }

  getUserInfoByEmail(email: string) {
    return this.http.get<User[]>(`${this.rootUrl}/users?email=${email}`);
  }

  getUserIdFromLocalStorage() {
    return localStorage.getItem('user_id');
  }

  sendNewLetter(params: Email): Observable<any> {
    const senderInfo$ = this.getUserInfoByEmail(params.from);
    const recipientInfo$ = this.getUserInfoByEmail(params.to);
    const ccInfo$ = this.getUserInfoByEmail(params.cc);

    return forkJoin([senderInfo$, recipientInfo$, ccInfo$]).pipe(
      switchMap(([senderInfo, recipientInfo, ccInfo]) => {
        if (recipientInfo.length === 0) {
          return throwError({ error: { emailTo: true } });
        } else if (params.cc && ccInfo.length === 0) {
          return throwError({ error: { cc: true } });
        } else {
          const sender = senderInfo[0];
          const recipient = recipientInfo[0];
          const letterId = Math.floor(Math.random() * 999999) + 1;

          const senderEmailObj = {
            id: letterId,
            type: 'SENDER',
            from: params.from,
            to: params.to,
            subject: params.subject,
            msg: params.msg,
            date: params.date,
            cc: params.cc,
          };

          const recipientEmailObj = {
            id: letterId,
            type: 'RECIPIENT',
            from: params.from,
            to: params.to,
            subject: params.subject,
            msg: params.msg,
            date: params.date,
            cc: params.cc,
            isRead: false,
          };

          if (sender?.emails) {
            sender.emails.push(senderEmailObj);
          } else {
            sender.emails = [];
            sender.emails.push(senderEmailObj);
          }

          if (recipient?.emails) {
            recipient.emails.push(recipientEmailObj);
          } else {
            recipient.emails = [];
            recipient.emails.push(recipientEmailObj);
          }

          if (params.cc) {
            const cc = ccInfo[0];
            const ccEmailObj = {
              id: letterId,
              type: 'RECIPIENT_COPY',
              from: params.from,
              to: params.to,
              subject: params.subject,
              msg: `Copy: ${params.msg}`,
              date: params.date,
              cc: params.cc,
              isRead: false,
            };

            if (cc?.emails) {
              cc.emails.push(ccEmailObj);
            } else {
              cc.emails = [];
              cc.emails.push(ccEmailObj);
            }

            return forkJoin([
              this.http.put(`${this.rootUrl}/users/${sender.id}`, sender),
              this.http.put(`${this.rootUrl}/users/${recipient.id}`, recipient),
              this.http.put(`${this.rootUrl}/users/${cc.id}`, cc),
            ]);
          }
          return forkJoin([
            this.http.put(`${this.rootUrl}/users/${sender.id}`, sender),
            this.http.put(`${this.rootUrl}/users/${recipient.id}`, recipient),
          ]);
        }
      }),
      catchError((error) => {
        console.error('Error sending email:', error);
        return throwError(error);
      })
    );
  }

  getReceivedLetters() {
    return this.http
      .get<User>(`${this.rootUrl}/users/${this.getUserIdFromLocalStorage()}`)
      .pipe(
        map((data) => data.emails),
        map((emails: Email[]) =>
          emails.filter(
            (email: Email) =>
              email.type === 'RECIPIENT' || email.type === 'RECIPIENT_COPY'
          )
        )
      );
  }

  setReadLetter(id: number): Observable<any> {
    const userId = parseInt(this.getUserIdFromLocalStorage(), 10);
    return this.http.get<User>(`${this.rootUrl}/users/${userId}`).pipe(
      switchMap((user) => {
        const email = user.emails.find((email) => email.id === id);
        if (email) {
          email.isRead = true;
          return this.http.put(`${this.rootUrl}/users/${userId}`, user);
        } else {
          return throwError('Email not found');
        }
      }),
      catchError((error) => {
        console.error('Error setting email as read:', error);
        return throwError(error);
      })
    );
  }

  deleteLetter(id: number): Observable<any> {
    const userId = parseInt(this.getUserIdFromLocalStorage(), 10);
    return this.http.get<User>(`${this.rootUrl}/users/${userId}`).pipe(
      switchMap((user) => {
        const index = user.emails.findIndex((email) => email.id === id);
        if (index !== -1) {
          user.emails.splice(index, 1);
          return this.http.put(`${this.rootUrl}/users/${userId}`, user);
        } else {
          return throwError('Email not found');
        }
      }),
      catchError((error) => {
        console.error('Error deleting email:', error);
        return throwError(error);
      })
    );
  }

  getSentLetters() {
    return this.http
      .get<User>(`${this.rootUrl}/users/${this.getUserIdFromLocalStorage()}`)
      .pipe(
        map((data) => data.emails),
        map((emails: Email[]) =>
          emails.filter((email: Email) => email.type === 'SENDER')
        )
      );
  }

  saveDraft(params: Email) {
    const senderInfo$ = this.getUserInfoByEmail(params.from);
    const draftObj = {
      id: Math.floor(Math.random() * 999999) + 1,
      from: params.from,
      to: params.to,
      subject: params.subject,
      msg: params.msg,
      date: params.date,
      cc: params.cc,
    };

    return forkJoin([senderInfo$]).pipe(
      switchMap(([senderInfo]) => {
        const sender = senderInfo[0];

        if (sender?.drafts) {
          sender.drafts.push(draftObj);
        } else {
          sender.drafts = [];
          sender.drafts.push(draftObj);
        }

        return forkJoin([
          this.http.put(`${this.rootUrl}/users/${sender.id}`, sender),
        ]);
      }),
      catchError((error) => {
        console.error('Error sending email:', error);
        return throwError(error);
      })
    );
  }

  getDrafts() {
    return this.http
      .get<User>(`${this.rootUrl}/users/${this.getUserIdFromLocalStorage()}`)
      .pipe(map((data) => data.drafts));
  }

  deleteDraft(id: number): Observable<any> {
    const userId = parseInt(this.getUserIdFromLocalStorage(), 10);
    return this.http.get<User>(`${this.rootUrl}/users/${userId}`).pipe(
      switchMap((user) => {
        const index = user.drafts.findIndex((draft) => draft.id === id);
        if (index !== -1) {
          user.drafts.splice(index, 1);
          return this.http.put(`${this.rootUrl}/users/${userId}`, user);
        } else {
          return throwError('Draft not found');
        }
      }),
      catchError((error) => {
        console.error('Error deleting draft:', error);
        return throwError(error);
      })
    );
  }

  getUsers() {
    return this.http.get<User[]>(`${this.rootUrl}/users`);
  }
}
