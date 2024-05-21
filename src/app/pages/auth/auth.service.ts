import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { User } from 'src/app/types/user';

interface SigninParams {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootUrl = 'http://localhost:3000';
  signedIn$ = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  usernameAvailable(username: string): Observable<void> {
    return of(username).pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((username) => {
        return this.http
          .get<User[]>(`${this.rootUrl}/users?username=${username}`)
          .pipe(
            switchMap((users) => {
              if (users.length > 0) {
                return throwError({ error: { username: true } });
              } else {
                return of(null);
              }
            })
          );
      })
    );
  }

  signup(credentials: User) {
    return this.http.post<User>(`${this.rootUrl}/users`, credentials).pipe(
      tap(({ id }) => {
        this.signedIn$.next(true);
        this.setUserIdToLocalStorage(id);
      })
    );
  }

  signin(credentials: SigninParams) {
    return this.http
      .get<User[]>(`${this.rootUrl}/users?email=${credentials.email}`)
      .pipe(
        switchMap((users) => {
          if (users.length === 0) {
            return throwError({ email: true });
          } else if (users[0].password !== credentials.password) {
            return throwError({ password: true });
          } else {
            this.signedIn$.next(true);
            this.setUserIdToLocalStorage(users[0].id);
            return of(null);
          }
        })
      );
  }

  checkAuth() {
    if (this.getUserIdFromLocalStorage()) {
      this.signedIn$.next(true);
      return true;
    } else {
      this.signedIn$.next(false);
      return false;
    }
  }

  signout() {
    localStorage.removeItem('user_id');
  }

  getUserIdFromLocalStorage() {
    return localStorage.getItem('user_id');
  }

  setUserIdToLocalStorage(id: number) {
    localStorage.setItem('user_id', String(id));
  }

  removeUserIdFromLocalStorage() {
    localStorage.removeItem('user_id');
  }
}
