import { Component } from '@angular/core';
import { ProductInfo, PurchaseOrder, PurchasehistoryService } from '../purchasehistory.service';

@Component({
  selector: 'app-purchasehistory',
  templateUrl: './purchasehistory.component.html',
  styleUrls: ['./purchasehistory.component.css'],
  providers: [PurchasehistoryService],
})
export class PurchasehistoryComponent {
  purchaseOrders: PurchaseOrder[] = [];

  constructor(private purchasehistoryService: PurchasehistoryService) {
    this.getProducts();
  }

  getProducts() {
    this.purchasehistoryService.getAllPurchases().subscribe((results) => {
      this.purchaseOrders = results;
      console.log(results);
    });
  }

  formatPurchaseDate(date: string) {
    return date.split(' ')[0];
  }

  getTotalPrice(products: ProductInfo[]) {
    let total = 0;
    products.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }
}
