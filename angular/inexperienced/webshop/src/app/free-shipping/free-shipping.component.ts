import { Component, OnInit } from '@angular/core';
import random from 'random'
import { getCookie, setCookie } from 'typescript-cookie';

@Component({
  selector: 'app-free-shipping',
  templateUrl: './free-shipping.component.html',
  styleUrls: ['./free-shipping.component.css']
})
export class FreeShippingComponent implements OnInit{
  freeShipping: boolean = false;

  ngOnInit() {
    if (document.cookie.indexOf('freeshipping') !== -1) {
      if (getCookie('freeshipping') === "true") {
        this.freeShipping = true;
      }
      // We already have a cookie named freeshipping
      return
    }

    const dice_hit = random.int(0, 1);

    if (dice_hit === 0) {
      // We have free shipping
      this.freeShipping = true;
      setCookie('freeshipping', this.freeShipping)
      return;
    }
      // We don't have free shipping
      setCookie('freeshipping', this.freeShipping)
  }
}
