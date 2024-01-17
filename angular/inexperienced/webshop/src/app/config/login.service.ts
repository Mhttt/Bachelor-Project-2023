import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import LoginInterface from 'src/types/LoginInterface';
import { BehaviorSubject } from 'rxjs';
import UserInterface from 'src/types/UserInterface';

@Injectable()
export default class LoginService {

  constructor(private http: HttpClient) {
    const response = { username: "deniz123", "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZW5pejEyMyIsImlhdCI6MTY4MTEyNjI5NSwibmJmIjoxNjgxMTI2Mjk1LCJqdGkiOiJmMjVkNWQwNi1lMjEyLTQ5ZjUtYjFiNy04ZWRjMGNjOGM2MWIiLCJleHAiOjE2ODExMjcxOTUsInR5cGUiOiJhY2Nlc3MiLCJmcmVzaCI6ZmFsc2V9.9rUmXrue08RjkpZW5gUQk7IJv_mXjvaLQq9hGnRR2Tc", "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZW5pejEyMyIsImlhdCI6MTY4MTEyNDA2OCwibmJmIjoxNjgxMTI0MDY4LCJqdGkiOiIwMDkyNWE5ZS03N2ZkLTRmYjItYTRhZC0zNDQyZjNjNzM2MzMiLCJleHAiOjE2ODM3MTYwNjgsInR5cGUiOiJyZWZyZXNoIn0.vVZb7THvlUCgjss9O3H0E-mOacOY__MZcM7NsK4izEs" }
    this.user.next(response)
  }

  public user = new BehaviorSubject<UserInterface | null>(null)

  login(form: LoginInterface) {
    return this.http.post<any>("http://143.42.222.62:8000/login", form)
  }

  isLoggedIn() {
    return this.user.value !== null
  }
}

