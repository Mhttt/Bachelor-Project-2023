import { Component } from '@angular/core';
import { LoginService, loginUser } from '../login.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CookieService } from '../cookie.service';
import jwt_decode, { JwtPayload } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, CookieService],
})
export class LoginComponent {
  user: loginUser = {
    username: '',
    password: '',
  };

  constructor(
    private loginService: LoginService,
    private cookieService: CookieService
  ) {}

  loginUser() {
    console.log(this.user);
    if (this.user.username && this.user.password) {
      return this.loginService.login(this.user).subscribe((result) => {
        if (result) {
          if (Object.values(result as object)[0].length > 0) {
            this.cookieService.setCookie(
              'access_token',
              Object.values(result as object)[0]
            );
            this.cookieService.setCookie(
              'refresh_token',
              Object.values(result as object)[1]
            );
            return alert('Logged in!');
          }
        }
      });
    }
    return alert('You must fill in all fields');
  }
}
