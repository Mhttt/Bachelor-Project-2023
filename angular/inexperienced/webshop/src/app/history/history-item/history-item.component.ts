import { Component, Input, OnInit } from "@angular/core";
import RegisterInterface from "src/types/RegisterInterface";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

@Component({
  selector: "app-history-item",
  templateUrl: "./history-item.component.html",
  styleUrls: ["./history-item.component.css"],
})
export class HistoryItemComponent {

  @Input() id: string;
  @Input() date: Date
  @Input() price: number;
  @Input() image_url: string;

  dateFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  } as any;
}
