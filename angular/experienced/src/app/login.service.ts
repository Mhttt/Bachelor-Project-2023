import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';

@Injectable()
export class LoginService {
  private apiURL = 'http://143.42.222.62:8000';
  
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      alert("Wrong username or password")
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  login(userToLogin: loginUser) {
    // call it here
    return this.http.post<User[]>(`${this.apiURL}/login`, userToLogin).pipe(catchError(this.handleError));
  }

}

export interface User {
  username: string;
  email: string;
  _id: string;
}

export interface loginUser {
  username: string;
  password: string;
}
