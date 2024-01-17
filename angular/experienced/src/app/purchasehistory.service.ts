import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from './cookie.service';

@Injectable()
export class PurchasehistoryService {
  private apiURL = 'http://143.42.222.62:8000';
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAllPurchases() {
    const token = this.cookieService.getCookie('access_token');
    let headers = new HttpHeaders({ responseType: 'json' });

    if (typeof token === 'string' && token.length > 30) {
      headers = headers.append('Authorization', `Bearer ${token}`);
      return this.http
        .get<PurchaseOrder[]>(`${this.apiURL}/purchases`, { headers: headers })
        .pipe();
    }
    return this.http
      .get<PurchaseOrder[]>(`${this.apiURL}/purchases`, { headers: headers })
      .pipe();
  }
}

export interface PurchaseOrder {
  _id: string;
  image_url: string;
  items: ProductInfo[];
  purchase_date: string;
}

export interface ProductInfo {
  product_id: string;
  quantity: number;
  price: number;
  name: string;
}
