import { Component } from '@angular/core';
import { RegisterService, RegisterUser } from '../register.service';
import { CookieService } from '../cookie.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService],
})
export class RegisterComponent {
  user: RegisterUser = {
    email: '',
    username: '',
    password: '',
    password_repeat: '',
  };

  constructor(
    private registerService: RegisterService,
    private cookieService: CookieService
  ) {}

  isLoggedIn() {
    return this.cookieService.isLoggedIn();
  }

  logoutUser() {
    return this.cookieService.logoutUser();
  }

  registerUser() {
    console.log(this.user);
    if (this.user) {
      if (
        this.user.username &&
        this.user.email &&
        this.user.password &&
        this.user.password_repeat
      ) {
        if (this.user.password === this.user.password_repeat) {
          return this.registerService
            .registerUser(this.user)
            .subscribe((result) => {
              console.log(result);
              if (result && result.length > 0) {
                if (result[0]._id) {
                  return alert('Registered!');
                }
              }
              if (result && result['detail' as any]!) {
                return alert(result['detail' as any]);
              }
              return alert('Error registering you!');
            });
        }
        return alert('Passwords does not match');
      }
      return alert('All fields must be filled out');
    }
    return alert('You must fill in all fields');
  }
}

type OnlyKeys = keyof RegisterUser;
