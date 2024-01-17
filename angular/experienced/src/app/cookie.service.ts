import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Cookies from 'js-cookie';

@Injectable()
export class CookieService {
  constructor() {}

  setCookie(key: string, value: string, expires?: object) {
    Cookies.set(key, value, expires);
  }

  getCookie(key: string) {
    return Cookies.get(key);
  }

  deleteCookie(key: string) {
    Cookies.remove(key);
  }

  isLoggedIn() {
    const accessToken = this.getCookie('access_token');
    return typeof accessToken === 'string' && accessToken.length > 30;
  }

  addAuthHeader() {
    const token = this.getCookie('access_token');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (typeof token === 'string' && token.length > 30) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  logoutUser() {
    this.setCookie('access_token', '');
    this.setCookie('refresh_token', '');
    location.reload();
  }
}
