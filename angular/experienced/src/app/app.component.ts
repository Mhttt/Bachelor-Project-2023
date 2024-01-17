import { Component } from '@angular/core';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { CookieService } from './cookie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CookieService],
})
export class AppComponent {
  //Username from jwt token
  displayUser: string | undefined = 'Register';

  constructor(private cookieService: CookieService) {}

  returnUser() {
    const accessToken = this.cookieService.getCookie('access_token');
    if (typeof accessToken === 'string' && accessToken.length > 30) {
      this.displayUser = jwt_decode<JwtPayload>(accessToken).sub;
      return this.displayUser;
    }
    return this.displayUser;
  }

}
