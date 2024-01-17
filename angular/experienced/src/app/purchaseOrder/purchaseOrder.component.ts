import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductInfo, PurchaseOrder } from '../purchasehistory.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-purchaseOrder',
  templateUrl: './purchaseOrder.component.html',
  styleUrls: ['./purchaseOrder.component.css'],
  providers: [ProductService],
})
export class PurchaseOrderComponent {
  order: PurchaseOrder | undefined;
  orderId: string | undefined;

  constructor(
    private route: ActivatedRoute,
    public productService: ProductService
  ) {
    this.route.params.subscribe((routes) => (this.orderId = routes['id']));
    if (this.orderId) {
      this.getOrder(this.orderId);
    }
  }

  getOrder(orderId: string) {
    this.productService.getOrder(orderId).subscribe((result) => {
      this.order = result;
    });
  }

  getTotalPrice(products: ProductInfo[] | undefined) {
    let total = 0;
    products?.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }
}
