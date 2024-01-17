import { Component } from '@angular/core';
import { CookieService } from '../cookie.service';

@Component({
  selector: 'app-shippingheader',
  templateUrl: './shippingheader.component.html',
  styleUrls: ['./shippingheader.component.css'],
  providers: [CookieService],
})
export class ShippingheaderComponent {
  showHeader: boolean;

  constructor(private cookieService: CookieService) {
    // Check if cookie exists
    const cookie = cookieService.getCookie('freeshipping');

    if (cookie) {
      // There is a cookie
      cookie === 'true' ? (this.showHeader = true) : (this.showHeader = false);
    } else {
      // there is no cookie
      const random = Math.floor(Math.random() * (2 - 1 + 1) + 1);

      random === 1 ? (this.showHeader = true) : (this.showHeader = false);

      cookieService.setCookie('freeshipping', random === 1 ? 'true' : 'false');
    }
  }
}
