import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class RegisterService {
  private apiURL = 'http://143.42.222.62:8000';
  constructor(private http: HttpClient) {}

  registerUser(userToRegister: RegisterUser) {
    // call it here
    return this.http
      .post<User[]>(`${this.apiURL}/register`, userToRegister)
      .pipe();
  }
}

export interface User {
  username: string;
  email: string;
  _id: string;
}

export interface RegisterUser {
  username: string;
  email: string;
  password: string;
  password_repeat: string;
}
