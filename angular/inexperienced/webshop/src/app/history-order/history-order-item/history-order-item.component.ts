import { Component, Input } from "@angular/core";

@Component({
  selector: "app-history-order-item",
  templateUrl: "./history-order-item.component.html",
  styleUrls: ["./history-order-item.component.css"],
})
export class HistoryOrderItemComponent {

  @Input() id: string;
  @Input() quantity: Date
  @Input() price: number;
  @Input() image_url: string;
}
